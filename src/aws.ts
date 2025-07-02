import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
    accessKeyId: "3d7ba8b5b211f21dd3cb677169606043",
    secretAccessKey: "d4202c3be58c1e356a851466759eb3a5f99406a05536b6a169610ba4ed5eb0ee",
    endpoint: "https://80cb1a610f7d90354b4370b4c3ef63c9.r2.cloudflarestorage.com"
})

export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(response);
}