import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

//GET ALL User

export async function GET(){
    try{
        await dbConnect();
        const users = await UserModel.find();
        console.log("users",users);
    }
    catch(error : any)
    {
        return NextResponse.json({
            success:false, error:error.message,
            status:500
        })
    }

}

