import { DBConnect } from "@/data/mongoose";
import { PersonnelModel } from "@/models/personnel";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
  try {
      await DBConnect();
      const {id} = await req.json()
      const updateData = await req.json()

      const modifierPersonnel = await PersonnelModel.findByIdAndUpdate(id,updateData,{new:true,runValidators:true})
      
      if (modifierPersonnel) {
          return  NextResponse.json({message:"ok",data:modifierPersonnel})
      } else {
          return NextResponse.json({message:"Erreur survenue"})
      }
  } catch (error) {
      console.log(error);
      
  }

}