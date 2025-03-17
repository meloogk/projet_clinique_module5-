"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Personnel } from "../../type";

export default function EditPersonnel() {
  const router = useRouter();
  const { id } = router.query;
  const [personnel, setPersonnel] = useState<Personnel | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/update_personnel`)
        .then((res) => res.json())
        .then((data) => setPersonnel(data.find((p: Personnel) => p.id === id)));
    }
  }, [id]);

  if (!personnel) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Modifier {personnel.nom}</h1>
      <form className="bg-white shadow-md rounded-lg p-6">
        <label className="block mb-2">Nom</label>
        <input type="text" className="w-full p-2 border rounded mb-4" defaultValue={personnel.nom} />
        
        <label className="block mb-2">Spécialité</label>
        <input type="text" className="w-full p-2 border rounded mb-4" defaultValue={personnel.specialite} />

        <label className="block mb-2">Contact</label>
        <input type="text" className="w-full p-2 border rounded mb-4" defaultValue={personnel.contact} />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
