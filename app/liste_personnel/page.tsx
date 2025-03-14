"use client"

import { useEffect, useState } from "react";
import { Personnel } from "../../type";
import Link from "next/link";

export default function PersonnelList() {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // État de chargement
  const [error, setError] = useState<string | null>(null); // État d'erreur

  useEffect(() => {
    fetch("/api/personnel")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        return res.json();
      })
      .then((data) => {
        setPersonnel(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erreur: {error}</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Liste du Personnel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personnel.map((person) => (
          <div key={person.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold">{person.nom}</h2>
            <p className="text-gray-600">{person.specialite}</p>
            <p className="text-gray-600">{person.contact}</p>
            <Link href={`/afficher_details_personnel/${person.id}`} className="text-blue-500 mt-3 block">
              Voir la fiche
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
