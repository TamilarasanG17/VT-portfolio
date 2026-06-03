require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.TO_EMAIL,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send email"
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});