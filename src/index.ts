import AdminJS, { RecordActionResponse, ValidationError } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Team } from "./entities/ITeam";
import { Distribution, DistributionPhoto } from "./entities/IDistribution";
import * as AdminJSTypeorm from "@adminjs/typeorm";
import { AppDataSource, authenticate, connect } from "./db-admin";
import { uploadDistribution } from "./distribution-upload";
import { AdminUser } from "./entities/IAdminUser";
import { LoginWrapper } from "./login";
import { RoyaltiesUpload } from "./entities/IRoyalties";
import { MemeLabRoyalty, validateRoyalty } from "./entities/IMemeLabRoyalty";

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, "..", `.env.${process.env.NODE_ENV}`);
console.log(`[LOADING FROM .env.${process.env.NODE_ENV}]`);
dotenv.config({
  path: envPath,
});

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

const PORT = 4000;

const express = require("express");
const bodyParser = require("body-parser");

const canEditAdminUser = (request: any) => {
  const currentAdmin = request.currentAdmin.id;
  const currentRecord = request.record.params.id;
  return currentAdmin == currentRecord;
};

const start = async () => {
  const source = await connect();

  const app = express();

  app.use(express.static("admin-assets"));

  const admin = new AdminJS({
    rootPath: "/",
    resources: [
      {
        resource: AdminUser,
        options: {
          listProperties: ["email"],
          editProperties: ["email", "password"],
          showProperties: ["email"],
          actions: {
            list: {
              before: async (request: any, context: any) => {
                request.query.perPage = 50;
                return request;
              },
            },
            edit: {
              isAccessible: canEditAdminUser,
            },
            delete: {
              isAccessible: canEditAdminUser,
            },
            bulkDelete: {
              isAccessible: false,
            },
          },
        },
      },
      {
        resource: Team,
        options: {
          listProperties: ["collection", "name", "wallet"],
          properties: {
            wallet: { isVisible: true },
          },
          actions: {
            list: {
              before: async (request: any, context: any) => {
                request.query.perPage = 50;
                return request;
              },
            },
          },
        },
      },
      {
        resource: Distribution,
        options: {
          perPage: 50,
          listProperties: ["contract", "card_id", "phase", "wallet", "count"],
          showProperties: ["contract", "card_id", "phase", "wallet", "count"],
          actions: {
            new: { isAccessible: false },
            list: {
              before: async (request: any, context: any) => {
                request.query.perPage = 50;
                return request;
              },
            },
          },
        },
      },
      {
        resource: DistributionPhoto,
        options: {
          perPage: 50,
          listProperties: ["contract", "card_id", "link"],
          actions: {
            list: {
              before: async (request: any, context: any) => {
                request.query.perPage = 50;
                return request;
              },
            },
          },
        },
      },
      {
        resource: RoyaltiesUpload,
        options: {
          perPage: 50,
          sort: {
            sortBy: "date",
            direction: "desc",
          },
          // listProperties: ["reference_date", "created_at", "url"],
          properties: {
            reference_date: {
              isVisible: {
                list: true,
                edit: false,
                new: false,
                show: true,
                filter: false,
              },
            },
            date: {
              isVisible: {
                list: false,
                edit: true,
                new: true,
                show: false,
                filter: true,
              },
            },
            url: {
              isVisible: {
                list: true,
                edit: true,
                new: true,
                show: true,
                filter: false,
              },
            },
            created_at: {
              isVisible: {
                list: true,
                edit: true,
                new: true,
                show: true,
                filter: false,
              },
            },
          },
          actions: {
            new: { isAccessible: false },
            edit: { isAccessible: false },
            delete: {
              isAccessible: false,
            },
            bulkDelete: {
              isAccessible: false,
            },
            list: {
              before: async (request: any, context: any) => {
                request.query.perPage = 50;
                return request;
              },
              after: async (response: any, context: any) => {
                response.records = response.records.map((record: any) => ({
                  ...record,
                  params: {
                    ...record.params,
                    reference_date: new Date(record.params.date).toDateString(),
                  },
                }));
                return response;
              },
            },
            show: {
              after: async (response: any, context: any) => {
                response.record.params.reference_date = new Date(
                  response.record.params.date
                ).toDateString();
                return response;
              },
            },
          },
        },
      },
      {
        resource: MemeLabRoyalty,
        options: {
          perPage: 50,
          sort: {
            sortBy: "token_id",
            direction: "asc",
          },
          properties: {
            token_id: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
                new: true,
              },
              isEditable: true,
            },
            royalty_split: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
                new: true,
              },
            },
          },
          actions: {
            new: {
              before: async (request: any) => {
                const existingRoyalty = await AppDataSource.getRepository(
                  MemeLabRoyalty
                ).findOne({
                  where: { token_id: request.payload.token_id },
                });
                if (existingRoyalty) {
                  throw new ValidationError(
                    {
                      token_id: {
                        message: "Entry for this token_id already exists.",
                      },
                    },
                    {
                      message: "Invalid token id",
                    }
                  );
                }
                validateRoyalty(request.payload.royalty_split);
                return request;
              },
            },
            edit: {
              before: async (request: any) => {
                validateRoyalty(request.payload.royalty_split);
                return request;
              },
            },
          },
        },
      },
    ],
    locale: {
      language: "en",
      translations: {
        labels: {
          loginWelcome: "",
          MemeLabRoyalty: "MemeLab Royalties",
        },
        messages: {
          loginWelcome: "",
        },
      },
    },
    branding: {
      logo: "https://d3lqz0a4bldqgf.cloudfront.net/seize_images/Seize_Logo_Glasses_2.png",
      favicon: "https://seize.io/favicon.ico",
      companyName: "SEIZE.IO ADMIN",
      withMadeWithLove: false,
    },
    assets: {
      styles: ["/css/login.css", "/css/style.css"],
    },
    dashboard: {
      component: "CustomDashboard",
    },
    pages: {
      "+ New Distribution Plan": {
        component: "UploadDistribution",
      },
    },
    settings: {
      defaultPerPage: 50,
    },
  });
  admin.componentLoader.add("CustomDashboard", "./dashboard");
  admin.componentLoader.add("UploadDistribution", "./uploadDistribution");
  admin.componentLoader.add("Login", "./login");
  admin.overrideLogin({
    component: LoginWrapper,
    props: {
      message: "",
    },
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "6529admin",
      cookiePassword: "6529adminsecret",
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret: "6529adminsecret",
      // cookie: {
      //   httpOnly: process.env.NODE_ENV === "production",
      //   secure: process.env.NODE_ENV === "production",
      // },
      name: "6529admin",
    }
  );
  if (process.env.NODE_ENV == "local") {
    admin.watch();
  }
  app.use("/", adminRouter);
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  app.post(
    "/upload",
    upload.single("distribution"),
    async (req: any, res: any) => {
      const contract = req.fields["contract"];
      const cardId = req.fields["card_id"];
      const snapshotBlock = req.fields["snapshot_block"];
      const distributionFile = req.files["distribution"];
      const photoKeys: any[] = Object.keys(req.files).filter((f: any) =>
        f.startsWith("photo")
      );
      const photos = photoKeys.map((key) => req.files[key]);
      if (!contract || contract == "undefined") {
        const msg = "Bad Contract";
        console.log("Upload Bad Request", msg);
        res.status(400).send(msg);
      } else if (!cardId || cardId == "undefined") {
        const msg = "Bad Card ID";
        console.log("Upload Bad Request", msg);
        res.status(400).send(msg);
      } else if (
        (!snapshotBlock || snapshotBlock == "undefined") &&
        distributionFile
      ) {
        const msg = "Missing Snapshot Block";
        console.log("Upload Bad Request", msg);
        res.status(400).send(msg);
      } else if (
        (!distributionFile || distributionFile == "undefined") &&
        photoKeys.length == 0
      ) {
        const msg = "Provide either distributionFile or photos";
        console.log("Upload Bad Request", msg);
        res.status(400).send(msg);
      } else {
        console.log(
          "Uploading",
          contract,
          cardId,
          distributionFile?.name,
          photoKeys.length
        );
        const response = await uploadDistribution(
          source,
          contract,
          cardId,
          snapshotBlock,
          distributionFile,
          photos
        );

        if (response.success) {
          res.send("Upload complete.");
        } else {
          res.status(400).send(`${response.error}`);
        }
      }
    }
  );

  const server = app.listen(PORT, () => {
    console.log(`SEIZE.IO ADMIN started on :${PORT}${admin.options.rootPath}`);
  });
  server.timeout = 60000;
};

start();
