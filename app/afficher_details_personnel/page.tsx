"use client";

import { useEffect, useState } from "react";
import { Personnel } from "../../type";


export default function PersonnelList() {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch("/api/afficher_personnel");
        const data = await response.json();
        setPersonnel(data.personnel);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonnel();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Liste du Personnel
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Chargement en cours...</p>
      ) : personnel.length === 0 ? (
        <p className="text-center text-red-500">Aucun membre du personnel trouvé.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Nom</th>
                <th className="py-3 px-6 text-left">Prénom</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Poste</th>
                <th className="py-3 px-6 text-left">Specialite</th>
              </tr>
            </thead>
            <tbody>
              {personnel.map((person) => (
                <tr key={person.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{person.nom}</td>
                  <td className="py-3 px-6">{person.prenom}</td>
                  <td className="py-3 px-6">{person.email}</td>
                  <td className="py-3 px-6">{person.role}</td>
                  <td className="py-3 px-6">{person.specialite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}