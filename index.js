import express from "express";
import bodyParser from "body-parser";
import { sendMail } from "./utils/mail.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  "/static",
  express.static(join(__dirname, "static"), {
    extensions: ["html", "css", "js", "pdf"],
  })
);
//app.use(express.static('recursos'));
app.use("/recursos", express.static(join(__dirname, "recursos")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/agradecimiento", (req, res) => {
  res.sendFile(join(__dirname, "agradecimiento.html"));
});

app.post("/email", (req, res) => {
  const { email, firstName } = req.body;
  if (!email || !firstName)
    return res.send({
      success: false,
    });
  sendMail(email, firstName, "");
  res.send({
    success: true,
  });
});

app.listen(port, () => console.log(`Running on ${port}`));

export default app;