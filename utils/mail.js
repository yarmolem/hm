import { config } from "../mailconfig.js";
import { join } from "path";
import fs from "fs/promises";
import { SMTPClient } from "emailjs";

const __dirname = process.cwd();

export async function sendMail(email, name) {
  try {
    const htmlContent = await fs.readFile(
      join(__dirname, "mensaje.html"),
      "utf-8"
    );

    const transporter = new SMTPClient(config);

    await new Promise((resolve, reject) => {
      transporter.send(
        {
          from: "magneticohombre@gmail.com",
          to: email,
          subject: `Asunto del correo: ¡Hola ${name}, aquí está tu eBook!`,
          text: "Text content of the email", // Add text content if needed
          attachment: [
            {
              data: join(__dirname, "./recursos/Libro.pdf"),
              alternative: true,
              type: "application/pdf",
              name: "La Guía Perfecta Para Saber Si Realmente Le Gustas A La Chica Que Te Vuelve Loco.pdf",
            },
          ],
        },
        (err, message) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(message);
            resolve(message);
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
  }
}
