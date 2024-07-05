import express from "express";
import cors from "cors";

const application = express();
application.use(cors());
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

export { application };
