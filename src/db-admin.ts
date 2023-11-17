import { DataSource } from "typeorm";
import { Team } from "./entities/ITeam";
import { Distribution, DistributionPhoto } from "./entities/IDistribution";
import { AdminUser } from "./entities/IAdminUser";
import { RoyaltiesUpload } from "./entities/IRoyalties";
import { MemeLabRoyalty } from "./entities/IMemeLabRoyalty";

const bcrypt = require("bcrypt");

export let AppDataSource: DataSource;

export async function connect() {
  console.log("[DATABASE]", `[DB HOST ${process.env.DB_HOST}]`);

  AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
      AdminUser,
      Team,
      Distribution,
      DistributionPhoto,
      RoyaltiesUpload,
      MemeLabRoyalty,
    ],
    synchronize: true,
    logging: false,
  });

  await AppDataSource.initialize().catch((error) => console.log(error));
  console.log("[DATABASE]", `[CONNECTION CREATED]`);

  const users = process.env.DEFAULT_ADMIN_USERS?.split(",");
  if (users) {
    const userRepo = AppDataSource.getRepository(AdminUser);
    const newAdminUsers: AdminUser[] = [];

    await Promise.all(
      users?.map(async (u) => {
        const user = await userRepo.findOne({ where: { email: u } });
        if (!user) {
          const newAdminUser = new AdminUser();
          newAdminUser.email = u;
          newAdminUser.password = u;
          newAdminUsers.push(newAdminUser);
        }
      })
    );
    console.log("SAVING ADMIN USERS", newAdminUsers.length);
    await userRepo.save(newAdminUsers);
  }

  const allMemeLab = await AppDataSource.createQueryRunner().query(
    "SELECT id FROM nfts_meme_lab"
  );
  const memelabRoyaltiesRepo = AppDataSource.getRepository(MemeLabRoyalty);
  for (const item of allMemeLab) {
    const id = item.id;

    const existingRoyalty = await memelabRoyaltiesRepo.findOne({
      where: { token_id: id },
    });

    if (!existingRoyalty) {
      const newRoyalty = new MemeLabRoyalty();
      newRoyalty.token_id = id;
      newRoyalty.royalty_split = 0;

      await memelabRoyaltiesRepo.save(newRoyalty);
    }
  }

  return AppDataSource;
}

export const authenticate = async (email: string, password: string) => {
  const adminUser = await AppDataSource.getRepository(AdminUser).findOne({
    where: {
      email: email,
    },
  });

  if (adminUser) {
    const auth = await bcrypt.compare(password, adminUser.password);
    if (auth) {
      return Promise.resolve(adminUser);
    }
  }
  return null;
};
