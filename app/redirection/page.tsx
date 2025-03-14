"use client";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center animate-fadeIn max-w-md border border-gray-200">
        <div className="flex justify-center">
          <FaExclamationTriangle className="text-red-500 text-7xl animate-pulse" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mt-5">Accès Refusé</h1>
        <p className="text-gray-600 mt-3 text-lg">
          Vous n'avez pas la permission d'accéder à cette page.
        </p>
        <div className="mt-6 space-y-3">
          <Link
            href="/"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/login"
            className="block bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Se reconnecter
          </Link>
        </div>
      </div>
    </div>
  );
}
