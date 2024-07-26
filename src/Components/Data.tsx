import countrie1 from '../assets/images/countrie1.png';
import countrie2 from '../assets/images/countrie2.png';
import countrie3 from '../assets/images/countrie3.png';

export const Countries = [
  {
    img: countrie1,
    alt: `CI`,
  },
  {
    img: countrie2,
    alt: `GUINNE`,
  },
  {
    img: countrie3,
    alt: `TOGO`,
  },
];

export const MenuItems = [
  {
    lib: 'Accueil',
    icon: 'material-symbols:home-outline',
    route: '/accueil',
  },
  {
    lib: 'Navires',
    icon: 'lucide:ship',
    route: '/navire',
  },
  {
    lib: 'Consignataires',
    icon: 'lucide:contact',
    route: '/consignataire',
  },
  {
    lib: 'Declaration',
    icon: 'mdi:file-check-outline',
    route: '',
    items: ['Declares-Conformes', 'DeclaresXConformes', 'Non-Declare'],
    ite: [
      {
        lib: 'Conformes',
        icon: 'lucide:circle-check-big',
        route: '/declaration_conforme',
      },
      {
        lib: 'Non Conformes',
        icon: 'charm:notes-cross',
        route: '/nom_conforme',
      },
      {
        lib: 'Non declares',
        icon: 'ph:x-circle',
        route: '/nom_declaration',
      },
    ],
  },
  {
    lib: 'Tonnes',
    icon: 'lucide:anvil',
    route: '/tonnes',
  },
];

export const Navires = [
  { imo: '452452', lib: 'MSC-CI' },
  { imo: '452452', lib: 'MSC-CI' },
  { imo: '452452', lib: 'MSC-CI' },
  { imo: '452452', lib: 'MSC-CI' },
];

export const Consignataire = [
  { imo: '452452', lib: 'DATA-FIELD' },
  { imo: '452452', lib: 'DATA-FIELD' },
  { imo: '452452', lib: 'DATA-FIELD' },
  { imo: '452452', lib: 'DATA-FIELD' },
];

export const Libs = [
  {
    id: 0,
    lib: 'DTCI',
  },
  {
    id: 1,
    lib: 'TM',
  },
];
export const headersNavire = ['#', 'IMO', 'Navires DTCI'];
export const headersConsignataires = ['#', 'Consignataires DTCI'];
export const headerTable = ['#', 'IMO', 'Nom', 'Mouvement', 'Date'];

export const TableConforme = [
  {
    id: '001',
    imo: 452452,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/01/2027',
  },
  {
    id: '002',
    imo: 452452,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETA',
    date: '24/02/2024',
  },
  {
    id: '003',
    imo: 452452,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/03/2024',
  },
  {
    id: '004',
    imo: 452452,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/04/2026',
  },
  {
    id: '005',
    imo: 455252,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/05/2025',
  },
  {
    id: '006',
    imo: 852452,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/08/2024',
  },
  {
    id: '007',
    imo: 4552252,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/09/2024',
  },
  {
    id: '008',
    imo: 5252352,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETA',
    date: '24/12/2026',
  },
  {
    id: '009',
    imo: 463552,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/12/2025',
  },
  {
    id: '010',
    imo: 4527852,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/11/2024',
  },
  {
    id: '011',
    imo: 4595122,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/12/2024',
  },
  {
    id: '012',
    imo: 4595122,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/11/2024',
  },
  {
    id: '013',
    imo: 4595122,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/11/2024',
  },
  {
    id: '014',
    imo: 212455,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETA',
    date: '24/11/2025',
  },
  {
    id: '015',
    imo: 789522,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/11/2025',
  },
  {
    id: '016',
    imo: 256922,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/04/2024',
  },
  {
    id: '017',
    imo: 78512,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/03/2024',
  },
  {
    id: '018',
    imo: 69324,
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/08/2026',
  },
];

export const TableConform555 = [
  {
    id: 1,
    imo: 9539212,
    libDTCI: 'ONYX ACE',
    type: 'viav',
    mouvement: 'Arrivée',
    date: '24-08-2026',
  },

  {
    id: 2,
    imo: 7715434,
    libDTCI: 'OCEAN LINK',
    type: 'viav',
    mouvement: 'ETD',
    date: '24/08/2026',
  },

  {
    id: 3,
    imo: 9954979,
    libDTCI: 'NS NINGBO',
    type: 'viav',
    mouvement: 'Arrivée',
    date: '24/08/2026',
  },
];
export const TableNavire = [
  { id: '001', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '002', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '003', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '004', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '005', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '006', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '007', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '008', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '009', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '010', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '011', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '012', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '013', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '014', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '015', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '016', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '017', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '018', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '019', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '020', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '021', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '022', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '023', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '024', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '025', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '026', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '027', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '028', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '029', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
  { id: '030', libDTCI: 'MSCI-CI', imo: 2156552, libTM: 'MSCI' },
];

export const TableConsignataire = [
  { id: '001', libDTCI: 'MSCI-CI' },
  { id: '002', libDTCI: 'MSCI-CI' },
  { id: '003', libDTCI: 'MSCI-CI' },
  { id: '004', libDTCI: 'MSCI-CI' },
  { id: '005', libDTCI: 'MSCI-CI' },
  { id: '006', libDTCI: 'MSCI-CI' },
  { id: '007', libDTCI: 'MSCI-CI' },
  { id: '008', libDTCI: 'MSCI-CI' },
  { id: '009', libDTCI: 'MSCI-CI' },
  { id: '010', libDTCI: 'MSCI-CI' },
  { id: '011', libDTCI: 'MSCI-CI' },
  { id: '012', libDTCI: 'MSCI-CI' },
  { id: '013', libDTCI: 'MSCI-CI' },
  { id: '014', libDTCI: 'MSCI-CI' },
  { id: '015', libDTCI: 'MSCI-CI' },
  { id: '016', libDTCI: 'MSCI-CI' },
  { id: '017', libDTCI: 'MSCI-CI' },
];
export const ItemsPeriode = [
  {
    year: '2024',
    months: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
  },
  {
    year: '2025',
    months: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
  },
  {
    year: '2026',
    months: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
  },
  {
    year: '2027',
    months: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
  },
  {
    year: '2028',
    months: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
  },
  {
    year: '2029',
    months: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
  },
];

export const AllMonths = [
  {
    value: '',
    name: 'Tous les mois',
  },
  {
    value: '01',
    name: 'Janvier',
  },
  {
    value: '02',
    name: 'Fevrier',
  },
  {
    value: '03',
    name: 'Mars',
  },
  {
    value: '04',
    name: 'Avril',
  },
  {
    value: '05',
    name: 'Mai',
  },
  {
    value: '06',
    name: 'Juin',
  },
  {
    value: '07',
    name: 'Juillet',
  },
  {
    value: '08',
    name: 'Aout',
  },
  {
    value: '09',
    name: 'Septembre',
  },
  {
    value: '10',
    name: 'Octobre',
  },
  {
    value: '11',
    name: 'Novembre',
  },
  {
    value: '12',
    name: 'Decembre',
  },
];

export const Year = [
  {
    value: '',
    year: 'Annee',
  },
  {
    value: '2024',
    year: '2024',
  },
  {
    value: '2025',
    year: '2025',
  },
  {
    value: '2026',
    year: '2026',
  },
  {
    value: '2027',
    year: '2027',
  },
  {
    value: '2028',
    year: '2028',
  },
];
