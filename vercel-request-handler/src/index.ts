import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: "3d7ba8b5b211f21dd3cb677169606043",
    secretAccessKey: "d4202c3be58c1e356a851466759eb3a5f99406a05536b6a169610ba4ed5eb0ee",
    endpoint: "https://80cb1a610f7d90354b4370b4c3ef63c9.r2.cloudflarestorage.com"
})

const app = express();

app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);