import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Contact from "@/models/Contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // 1. Save the message to MongoDB Atlas
    await dbConnect();

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // 2. Send Email Notification using Resend
    try {
      const timestamp = new Date(contact.createdAt).toLocaleString();
      
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "ronitmadage@gmail.com",
        subject: `New Portfolio Message: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        `,
      });
    } catch (emailError) {
      console.error("Resend Email Error:", emailError);
      // We continue since MongoDB was successful, but log the email error.
    }

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: any) {
    console.error("API Error - Contact Form:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation Error: Please check your inputs." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Server Error: Unable to send message." },
      { status: 500 }
    );
  }
}
