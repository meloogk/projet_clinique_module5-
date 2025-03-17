

import { DBConnect } from "@/data/mongoose";
import { PersonnelModel } from "@/models/personnel";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
  try {
      await DBConnect();
      const {id} = await req.json()

      const supprimer = await PersonnelModel.findByIdAndDelete(id)
      
      if ( supprimer) {
          return  NextResponse.json({message:"ok"})
      } else {
          return  NextResponse.json({message:"Erreur survenue"})
      }
  } catch (error) {
      console.log(error);
      
  }

}