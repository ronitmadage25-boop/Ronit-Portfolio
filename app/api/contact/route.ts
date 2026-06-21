import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Contact from "@/models/Contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    console.log("📩 Contact form submission received");
    console.log("Environment check:", {
      hasMongoUri: !!process.env.MONGODB_URI,
      hasResendKey: !!process.env.RESEND_API_KEY,
    });

    if (!name || !email || !subject || !message) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if required environment variables exist
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is not configured");
      return NextResponse.json(
        { error: "Database not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is not configured");
      // Don't fail if only email is not configured, still save to DB
      console.warn("⚠️ Email service not configured, but will continue with DB save");
    }

    // 1. Save the message to MongoDB Atlas
    try {
      console.log("📦 Attempting to connect to MongoDB...");
      await dbConnect();
      console.log("✅ MongoDB connected successfully");
      
      console.log("💾 Attempting to save contact...");
      const contact = await Contact.create({
        name,
        email,
        subject,
        message,
      });
      console.log("✅ Contact saved successfully:", contact._id);

      // 2. Send Email Notification using Resend (optional)
      if (process.env.RESEND_API_KEY) {
        try {
          const timestamp = new Date(contact.createdAt).toLocaleString();
          
          console.log("📧 Attempting to send email...");
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
          console.log("✅ Email sent successfully");
          
          return NextResponse.json({ success: true, data: contact }, { status: 201 });
          
        } catch (emailError: any) {
          console.error("❌ Email sending failed:", emailError.message);
          // Still return success since database save worked
          return NextResponse.json({ 
            success: true, 
            data: contact,
            warning: "Message saved but email notification failed" 
          }, { status: 201 });
        }
      } else {
        console.log("⚠️ Skipping email (no API key)");
        return NextResponse.json({ success: true, data: contact }, { status: 201 });
      }
      
    } catch (dbError: any) {
      console.error("❌ Database error:", dbError);
      console.error("Error details:", {
        name: dbError.name,
        message: dbError.message,
        code: dbError.code,
      });
      return NextResponse.json(
        { error: `Database error: ${dbError.message || "Unable to save message"}` },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("❌ Contact API Error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: `Server error: ${error.message || "Unable to process request"}` },
      { status: 500 }
    );
  }
}
