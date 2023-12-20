import express, { Router } from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import { sendMail } from "../utils/mail";

const app = express();
const router = Router();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/email", (req, res) => res.send("hello world"));

router.post("/email", (req, res) => {
  const { email, firstName } = req.body;
  console.log(req.body);
  if (!email || !firstName)
    return res.send({
      success: false,
    });
  sendMail(email, firstName, "");
  res.send({
    success: true,
  });
});

app.use("/api/", router);
export const handler = serverless(app);