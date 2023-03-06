const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function uploadFileToS3(s3: any, filePath: string, fileName: string) {
  const fileContent = await fs.readFileSync(filePath);
  const params = {
    Bucket: process.env.AWS_6529_IMAGES_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
  };
  await s3.send(new PutObjectCommand(params));
}

export const uploadPhotos = async (
  contract: string,
  cardId: number,
  photos: any[]
): Promise<string[]> => {
  const s3 = new S3Client({
    region: "eu-west-1",
    credentials: {
      accessKeyId: process.env.AWS_6529_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_6529_SECRET_ACCESS_KEY!,
    },
  });
  const keys: string[] = [];
  await Promise.all(
    photos.map(async (p) => {
      const name = p.name;
      const key = `distribution/${process.env.NODE_ENV}/${contract}/${cardId}/${name}`;
      await uploadFileToS3(s3, p.path, key);
      keys.push(`https://d3lqz0a4bldqgf.cloudfront.net/${key}`);
    })
  );
  return keys;
};
