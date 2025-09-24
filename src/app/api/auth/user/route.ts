import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import Twilio from "twilio";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import crypto from "crypto";

// Ensure Twilio credentials are available
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
  throw new Error("Twilio credentials are missing in .env.local");
}

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: Request) {
  try {
 
    await dbConnect();
       console.log("Connecting to db from user route");
    const body = await req.json();

    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Validate & normalize phone
    const parsed = parsePhoneNumberFromString(phone,"IN");

    if (!parsed || !parsed.isValid()) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const e164 = parsed.number;
    console.log("Normalized phone number:", e164);

    const verificationCode = String(
      Math.floor(100000 + Math.random() * 900000)
    );

   const user = await UserModel.create({
      phone: e164,
      otp: verificationCode,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
      email:'rahul090@gmail.com'
    });
console.log("Created user:", user);
    await client.messages.create({
      body: `Your OTP is ${verificationCode}. It expires in 5 minutes send by Rahul.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: e164,
    });

    return NextResponse.json({
      message: "User created successfully",
      user: 123456,
    });
  } catch (error: any) {
    console.log("error", error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}
