import { config } from "dotenv";
import { application } from "express";

config();

const applicationPort = process.env.APP_PORT || 3000;

application.listen(applicationPort, () => {
  console.log(`Server running on port ${applicationPort}`);
});
