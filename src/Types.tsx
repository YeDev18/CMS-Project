export type UserProps = {
  id: string;
};

export type TonnesTypes = {
  data_port: {
    Consignataire_port: string;
    Date_Mouvement_port: string;
    Imo_Navire_port: number;
    Mouvement_port: string;
    Nom_Navire_port: string;
    Tonnage_Trafic_National_port: number;
    Tonnage_Trafic_Total_port: number;
    Tonnage_Trafic_Transbordement_port: number;
    Tonnage_Trafic_Transit_Autres_port: number;
    Tonnage_Trafic_Transit_Burkina_port: number;
    Tonnage_Trafic_Transit_Mali_port: number;
    Type_Navire_port: string;
    id: number;
  };
  date_calcul: string;
  difference_tonnage: string;
  id: number;
  statut: string;
  tonnage_dt: {
    consignataire_dt_tonnage: string;
    date_declaration_dt_tonnage: string;
    eta_dt_tonnage: string;
    etd_dt_tonnage: string;
    id: number;
    imo_dt_tonnage: number;
    mouvement_dt_tonnage: string;
    mrn_dt_tonnage: string;
    nom_navire_dt_tonnage: string;
    numero_voyage_dt_tonnage: string;
    port_dt_tonnage: string;
    tonnage_facture_dt_tonnage: number;
    type_de_navire_dt_tonnage: string;
  };
  tonnage_facture_dt_tonnage: string;
  tonnage_trafic_national_port: string;
  label?: string;
};

export type TablesPropsTonnes = {
  data: TonnesTypes[];
  label?: string;
};

export type TableTonnesTypes = {
  item: {
    Id: string;
    Nom: string;
    IMO: string;
    Date: string;
    TonnagesDTCI: string;
    TonnagesPort: string;
    Ecart: string;
    Statuts: string;
  };
  index: number;
};

export type DeclarationTypes = {
  id: string;
  observation: string;
  soumission_dtci: {
    consignataire: string;
    consignataire_dtci: string;
    date_declaration_dtci: string;
    eta_dtci: string;
    etd_dtci: string;
    id: number;
    imo_dtci: string;
    mouvement_dtci: string;
    mrn_dtci: string;
    navire: string;
    nom_navire_dtci: string;
    numero_voyage_dtci: string;
    port_dtci: string;
    tonnage_facture_dtci: number;
    type_de_navire_dtci: string;
  };
  status: string;
  trafic_maritime: {
    consignataire_trafic: string;
    date_declaration_dt_tonnage: string;
    eta_dt_tonnage: string;
    etd_dt_tonnage: string;
    id: number;
    imo_trafic: number;
    mouvement_trafic: string;
    mrn_dt_tonnage: string;
    nom_navire_trafic: string;
    numero_voyage_dt_tonnage: string;
    port_dt_tonnage: string;
    tonnage_facture_dt_tonnage: number;
    type_de_navire_dt_tonnage: string;
    date_trafic: string;
    port_trafic: string;
  };
};

export type DataProps = {
  data: {
    idInstance: string;
    nonDTCI: string;
    imoDTCI: string;
    consignataireDTCI: string;
    mouvementDTCI: string;
    dateDTCI: string;
    dateDeclaration: string;
    port: string;
    typeNavire: string;
    mrn: string;
    numVoyage: string;
    consignataire: string;
    observation: string;
    dateTm: string;
  };
};

export type ConsigneeProps = { id: number; nom: string };

export type BoardProps = { id: number; imo: string; nom: string };

export type ExcelDataProps = {
  Id: number;
  Imo: number;
  Navire: string;
  Mouvement: string;
  Date: string;
  Port: string;
};
