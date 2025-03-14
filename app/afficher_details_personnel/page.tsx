import { GetServerSideProps } from "next";
import { Personnel } from "../../type";
import Link from "next/link";

export default function PersonnelDetail({ personnel }: { personnel: Personnel | null }) {
  if (!personnel) return <p>Personnel introuvable</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">{personnel.nom}</h1>
      <p className="text-gray-600">{personnel.specialite}</p>
      <p className="text-gray-600">{personnel.contact}</p>
      <h2 className="text-xl font-semibold mt-4">Planning</h2>
      <ul className="list-disc pl-5">
        {personnel.planning.map((horaire) => (
          <li key={horaire} className="text-gray-700">{horaire}</li>
        ))}
      </ul>

      <Link href={`/personneledit/${personnel.id}`} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
        Modifier
      </Link>
    </div>
  );
}

// Typage des params dans getServerSideProps
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/personnel`);
  const personnelList: Personnel[] = await res.json();
  
  // Vérifier si params?.id est défini et correspond à un ID valide
  if (typeof params?.id !== "string") {
    return { props: { personnel: null } };
  }

  // Chercher le personnel avec l'ID
  const personnel = personnelList.find((p) => p.id === params.id) || null;

  return { props: { personnel } };
};
