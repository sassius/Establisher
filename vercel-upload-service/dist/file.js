"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = getAllFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getAllFiles(folderPath) {
    let response = [];
    const allFilesAndFolder = fs_1.default.readdirSync(folderPath);
    allFilesAndFolder.forEach(file => {
        const fullFilePath = path_1.default.join(folderPath, file);
        if (fs_1.default.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath));
        }
        else {
            response.push(fullFilePath);
        }
    });
    return response;
}
