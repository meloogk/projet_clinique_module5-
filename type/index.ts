export type Personnel = {
    id: string;
    nom: string;
    specialite: string;
    contact: string;
    planning: string[];
    role: string;
    horaire?: string;  
  };


  export type Horaire = {
    id: string;
    personnelId: string;
    date: string; 
    heureDebut: string; 
    heureFin: string; 
    service: string;
  };
  