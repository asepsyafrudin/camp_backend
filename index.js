import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import userRoutes from "./routes/user.js";
import loginRoutes from "./routes/login.js";
import dataLogRoutes from "./routes/datalog.js";
import { createDataLogModels } from "./models/dataLog.js";
import plantRoutes from "./routes/plant.js";
import settingRoutes from "./routes/settings.js";
import { auth } from "./middleware/auth.js";
import env from "dotenv";
import compression from "compression";
import http from "http";
import { log } from "./config/logconfig.js";

env.config();

const port = process.env.PORT || 5000;
http.globalAgent.maxSockets = Infinity;

const app = express();
const server = http.createServer(app);
app.use(compression());

app.use(cors());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/static", express.static(path.join(__dirname, "./assets")));
// app.use(express.static(path.join(__dirname, "./public")));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/data_log", dataLogRoutes);
app.use("/api/master_plant", plantRoutes);
app.use("/api/master_setting", settingRoutes);
app.use("", (req, res) => {
  res.send("hello world");
});
const ph = () => {
  const max = 8;
  const min = 6;
  return Math.floor(Math.random() * (max - min)) + min;
};

const temperature = () => {
  const max = 40;
  const min = 10;
  return Math.random() * (max - min) + min;
};

const humidity = () => {
  const max = 80;
  const min = 20;
  return Math.random() * (max - min) + min;
};

// setInterval(async () => {
// const data = {
//   plant_id: "",
//   ph: float,
//   temperature: float,
//   humidity: float,
//   create_by: "",
//   update_by: "",
//   API_KEY : "",
//   API_SECRET : ""
// };
//   await createDataLogModels(data);
// }, 10000);
// for (let index = 0; index < 1000; index++) {
//   const data = {
//     plant_id: 2,
//     ph: ph(),
//     temperature: temperature(),
//     humidity: humidity(),
//     create_by: "admin",
//     update_by: "admin",
//     flag: 1,
//   };

//   await createDataLogModels(data);
// }

server.listen(port, () => {
  log.info("Server Already Run on Port " + port);
});
