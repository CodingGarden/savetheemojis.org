const express = require("express");
const cors = require("cors");
const monk = require("monk");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();

const app = express();

const db = monk("localhost/newsletter");
const emails = db.get("emails");

app.enable("trust proxy");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Emoji Newsletter! 📧 📰"
  });
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // my email address
    pass: process.env.PASSWORD // the password for my private access point
  }
});

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1
  })
);

app.get("/email", (req, res) => {
  emails.find().then(emails => res.json(emails));
});

app.post("/email", async (req, res) => {
  const email = {
    email: req.body.email.toString().trim(),
    created: new Date()
  };
  console.log(email);
  count = await emails.count({ email: email.email });
  if (count <= 0) {
    const message = fs.readFileSync("Registered.html").toString();
    emails
      .insert(email)
      .then(createdEmail => {
        res.json(createdEmail);
        let mailoptions = {
          from: "🎈Save the emojis!💖", // sender address
          to: email.email,
          subject: "Registraion on Save the emojis.",
          html: message
        };
        transporter
          .sendMail(mailoptions)
          .then(info => console.log(info))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  } else {
    res.json("You are already signed");
  }

});

app.listen(5000, () => console.log("Listening on http://localhost:5000"));

const sendNewsLetter = () => {

  const message = fs.readFileSync("Letter.html").toString();

  emails
    .find()
    .then(emails => {
      emails.forEach(email => {
        let mailoptions = {
          from: "🎈Save the emojis!💖", // sender address
          to: email.email,
          subject: "Emojis.",
          html: message
        }
        transporter.sendMail(mailoptions);
      })
    })
    .then(console.log)
    .catch(console.error);
}

setInterval(sendNewsLetter, 7 * 24 * 60 * 60 * 1000); //Once a week