"use client"
import { useState, useEffect } from "react";
import { Horaire } from "@/type";
import { FaCalendarAlt, FaClock, FaUser, FaHeartbeat, FaTrashAlt } from "react-icons/fa";

export default function Horaires() {
  const [horaires, setHoraires] = useState<Horaire[]>([]);
  const [formData, setFormData] = useState({
    personnelId: "",
    date: "",
    heureDebut: "",
    heureFin: "",
    service: "",
  });

  const services = ["Consultation", "Urgences", "Radiologie", "Chirurgie", "Pédiatrie", "Dentaire"]; 

  // Récupérer les horaires depuis l'API
  useEffect(() => {
    const fetchHoraires = async () => {
      try {
        const res = await fetch("/api/afficher_horaire");
        const data = await res.json();
        setHoraires(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des horaires :", error);
      }
    };
    fetchHoraires();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/creation_horaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newHoraire = await res.json();
      console.log(newHoraire)
      if (newHoraire.ok) {
        
        setHoraires((prevHoraires) => [...prevHoraires, newHoraire]);
        setFormData({
          personnelId: "",
          date: "",
          heureDebut: "",
          heureFin: "",
          service: "",
        });
      } else {
        console.error("Erreur lors de l'ajout de l'horaire");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8 transition-transform duration-300 ease-in-out">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Gestion des Horaires</h2>

      <form onSubmit={(e)=> handleSubmit(e)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative group">
            <FaUser className="absolute left-3 top-3 text-gray-500 transition-all group-hover:text-blue-500" />
            <input
              type="text"
              name="personnelId"
              placeholder="ID Personnel"
              value={formData.personnelId}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 pl-10 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              required
            />
          </div>
          <div className="relative group">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500 transition-all group-hover:text-blue-500" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 pl-10 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative group">
            <FaClock className="absolute left-3 top-3 text-gray-500 transition-all group-hover:text-blue-500" />
            <input
              type="time"
              name="heureDebut"
              value={formData.heureDebut}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 pl-10 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              required
            />
          </div>
          <div className="relative group">
            <FaClock className="absolute left-3 top-3 text-gray-500 transition-all group-hover:text-blue-500" />
            <input
              type="time"
              name="heureFin"
              value={formData.heureFin}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-4 pl-10 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              required
            />
          </div>
        </div>
        <div className="relative group">
          <FaHeartbeat className="absolute left-3 top-3 text-gray-500 transition-all group-hover:text-blue-500" />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-4 pl-10 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
            required
          >
            <option value="" disabled>Choisir un service médical</option>
            {services.map((service, index) => (
              <option key={index} value={service}>{service}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          Ajouter Horaire
        </button>
      </form>

      <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-6">Horaires Actuels</h3>
      <ul className="space-y-6">
        {horaires.map((horaire) => (
          <li key={horaire.id} className="border border-gray-300 p-6 rounded-lg shadow-md bg-white flex justify-between items-center transition-all duration-300 hover:shadow-xl">
            <div className="flex-1">
              <p className="text-lg text-gray-800 font-semibold">{horaire.date}</p>
              <p className="text-sm text-gray-600">{horaire.heureDebut} - {horaire.heureFin}</p>
              <p className="text-sm text-gray-500">{horaire.service}</p>
            </div>
            <button type="button" className="text-red-500 hover:text-red-700 transition-all duration-300">
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
