import express from "express";
import cors from "cors";
import simpleGit from "simple-git"
import { generate} from "./utils";
import path from "path"
import { getAllFiles } from "./file";
import { uploadFile } from "./aws";
import {createClient} from "redis";
// require('dotenv').config();

const publisher=createClient();
publisher.connect();

const app =express();
app.use(cors());
app.use(express.json());

app.post("/deploy",async (req,res)=>{
     const repoUrl = req.body.repoUrl;
     const id=generate();
     await simpleGit().clone(repoUrl,path.join(__dirname ,`output/${id}`));
     const files= getAllFiles(path.join(__dirname,`output/${id}`));
    //  console.log(files);
    files.forEach(async file=>{
        await uploadFile(file.slice(__dirname.length +1),file);
    })
    //  console.log(__dirname);
    publisher.lPush("build-queue",id);
    publisher.hSet("status",id,"uploaded")
     res.json({
        id:id
     })
})

app.listen(3000);