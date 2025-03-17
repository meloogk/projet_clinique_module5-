import mongoose from "mongoose";
const {models,model,Schema} = mongoose
const PersonnelSchema = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    telephone: { type: String, required: true },
    poste: { type: String, enum: ["Médecin", "Secrétaire", "Infirmier", "Administrateur"], required: true },
    specialite: { type: String }, // Optionnel, surtout pour les médecins
    dateEmbauche: { type: Date, default: Date.now },
    role: { type: String, enum: ["admin", "medecin", "secretaire"], default: "secretaire" },
    motDePasse: { type: String, required: true }, // À hasher avant stockage
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PersonnelModel = models.Personnel || model("Personnel", PersonnelSchema);
