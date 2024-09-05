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
    lib: 'Tonnages',
    icon: 'lucide:anvil',
    route: '/tonnages',
    ite: [
      {
        lib: 'Conformes',
        icon: 'lucide:circle-check-big',
        route: '/tonnages-conformes',
      },
      {
        lib: 'Non Conformes',
        icon: 'charm:notes-cross',
        route: '/tonnages-non-conformes',
      },
      {
        lib: 'Non declares',
        icon: 'ph:x-circle',
        route: '/tonnages-non-declares',
      },
    ],
  },
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
export const headersNavire = ['#', 'IMO', 'Navires'];
export const headersConsignataires = ['#', 'Consignataires DTCI'];
export const headerTable = ['#', 'Nom', 'IMO', 'Mouvement', 'Date'];
export const headerTableTonnes = [
  '#',
  'Nom',
  'IMO',
  'Date',
  'Tonnages DTCI',
  'Tonnages Port',
  'Ecart',
  'Statuts',
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
