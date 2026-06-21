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

    // Check if required environment variables exist
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not configured");
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // 1. Save the message to MongoDB Atlas
    try {
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
        
        return NextResponse.json({ success: true, data: contact }, { status: 201 });
        
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Still return success since database save worked
        return NextResponse.json({ 
          success: true, 
          data: contact,
          warning: "Message saved but email notification failed" 
        }, { status: 201 });
      }
      
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save message. Please try again." },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Unable to send message. Please try again later." },
      { status: 500 }
    );
  }
}
