

import { DBConnect } from "@/data/mongoose";
import { HoraireModel } from "@/models/horaire";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
  try {
      await DBConnect();
      const {id} = await req.json()

      const horaire = await HoraireModel.findByIdAndDelete(id)
      
      if (horaire) {
          return  NextResponse.json({message:"ok"})
      } else {
          return  NextResponse.json({message:"Erreur survenue"})
      }
  } catch (error) {
      console.log(error);
      
  }

}