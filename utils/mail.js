import { config } from "../mailconfig.js";
import { join } from "path";
import fs from "fs/promises";
import nodemailer from "nodemailer";

const __dirname = process.cwd();

export async function sendMail(email, name) {
  try {
    const transporter = nodemailer.createTransport(config);
    const htmlContent = await fs.readFile(
      join(__dirname, "mensaje.html"),
      "utf-8"
    );
    transporter.sendMail({
      from: "magneticohombre@gmail.com",
      to: email,
      subject: `Asunto del correo: ¡Hola ${name}, aquí está tu eBook!`,
      html: htmlContent,
      attachments: [
        {
          filename: "La Guía Perfecta Para Saber Si Realmente Le Gustas A La Chica Que Te Vuelve Loco.pdf",
          path: join(__dirname, "./recursos/Libro.pdf"),
          encoding: "base64",
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
}
