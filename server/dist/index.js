import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map