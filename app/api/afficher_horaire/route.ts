import { DBConnect } from "@/data/mongoose";
import { HoraireModel } from "@/models/horaire";
import { NextResponse } from "next/server";

export const GetHoraire = async (req:Request) => {
    try {
        await DBConnect();
        const {id} = req.json()
        const horaire = await HoraireModel.findById(id)
        
        if (horaire) {
            return   NextResponse.json({message:"ok",data:horaire})
        } else {
            return NextResponse.json({message:"Erreur survenue"})
        }
    } catch (error) {
        console.log(error);
        
    }

}