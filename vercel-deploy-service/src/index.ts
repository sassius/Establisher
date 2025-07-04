// index.ts

import { createClient, commandOptions } from "redis";
import { downloadS3Folder } from "./aws";

const subscriber = createClient();
subscriber.connect();
async function main() {
    
    console.log("Connected to Redis. Waiting for build jobs...");

    while (true) {
        const result = await subscriber.brPop(
            commandOptions({ isolated: true }),
            "build-queue",
            0
        );
        const id =result?.element; //optional chaining u just read value to avoid error since result returns string or null

        await downloadS3Folder(`/output/${id}`);
        // console.log("Received job:", result);
    }
}

main().catch((err) => {
    console.error("Redis Error:", err);
});
