import { DBConnect } from "@/data/mongoose";
import { PersonnelModel } from "@/models/personnel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await DBConnect();
    const personnel = await PersonnelModel.find(); // Récupère tous les membres du personnel

    return NextResponse.json({ message: "Liste du personnel", personnel });
  } catch (error) {
    console.error("Erreur lors de la récupération du personnel :", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
};
