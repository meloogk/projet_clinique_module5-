

import { DBConnect } from "@/data/mongoose";
import { HoraireModel } from "@/models/horaire";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        await DBConnect();
        const horaire = new HoraireModel(req.body)
        await horaire.save()
        if (horaire) {
            return  NextResponse.json({message:"ok",horaire})
        } else {
            return  NextResponse.json({message:"Erreur survenue"})
        }
    } catch (error) {
        console.log(error);
    }
}






