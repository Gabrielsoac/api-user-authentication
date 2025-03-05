import { Server } from "./server/Server";
import { connectDb } from "./database";
import "dotenv/config"

const port = process.env.PORT;

Server.listen(
    port,
    async () => {
        try {
            await connectDb();
            console.log(`server running on port ${port}`);
        } catch {
            console.log("Running Server Error");
        }
    }
);