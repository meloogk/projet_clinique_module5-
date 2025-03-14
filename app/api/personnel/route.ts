import type { NextApiRequest, NextApiResponse } from "next"; 
import personnel from "../../../data/personnel.json"; 
import { Personnel } from "../../../type"; 

export default function handler(req: NextApiRequest, res: NextApiResponse<Personnel[] | { message: string }>) {
  // Vérifier la méthode de la requête
  if (req.method === "GET") {
    // S'assurer que la réponse est bien au format JSON
    res.setHeader("Content-Type", "application/json");
    
    // Vérifier si la donnée existe et est bien structurée
    if (personnel && Array.isArray(personnel)) {
      return res.status(200).json(personnel); // Retourne la liste du personnel
    } else {
      // Si personnel n'est pas valide, retourner une erreur
      return res.status(500).json({ message: "Données invalides ou non disponibles" });
    }
  }

  // Gérer les requêtes non autorisées (méthodes autres que GET)
  return res.status(405).json({ message: "Méthode non autorisée" });
}
