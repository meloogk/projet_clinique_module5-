import mongoose from "mongoose";
const {models,model,Schema} = mongoose

const HoraireSchema = new Schema(
  {
    personnel: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
    jour: { type: String, enum: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"], required: true },
    heureDebut: { type: String, required: true }, 
    heureFin: { type: String, required: true }, 
    statut: { type: String, enum: ["Présent", "Absent", "Congé"], default: "Présent" },
   
  }
);

export const HoraireModel = models.Horaire || model("Horaire", HoraireSchema);
