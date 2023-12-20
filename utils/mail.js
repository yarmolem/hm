import { config } from "../mailconfig.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport(config);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export async function sendMail(email, name) {
    const htmlContent = await fs.readFile(join(__dirname, '../mensaje.html'), 'utf-8');
    transporter.sendMail({
        from: "drwnrugama@gmail.com",
        to: email,
        subject: `Asunto del correo: ¡Hola ${name}, aquí está tu eBook!`,
        html: htmlContent,
        attachments: [
            {
                filename: 'Libro.pdf',
                path: './Recursos/Libro.pdf',
                encoding: 'base64',
            }
        ]
    }, (err) => console.log(err));
}

