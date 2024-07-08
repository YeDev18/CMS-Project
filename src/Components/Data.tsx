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
    lib: 'Periode',
    icon: 'lucide:calendar-fold',
    route: '/periode',
  },
  {
    lib: 'Declaration',
    icon: 'mdi:file-check-outline',
    route: '',
    items: ['Declares-Conformes', 'DeclaresXConformes', 'Non-Declare'],
    ite: [
      {
        lib: 'Tonnes',
        icon: 'lucide:anvil',
        route: '/tonnes',
      },
      {
        lib: 'Tonnes',
        icon: 'lucide:anvil',
        route: '/tonnes',
      },
      {
        lib: 'Tonnes',
        icon: 'lucide:anvil',
        route: '/tonnes',
      },
    ],
  },
  {
    lib: 'Viva',
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
export const headersNavire = ['#', 'IMO', 'DTCI', 'TRAFIC MARITIME'];
export const headersConsignataires = ['#', 'DTCI'];
export const headerTable = ['#', 'Nom', 'Type', 'Mouvement', 'Date'];

export const TableConforme = [
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETA',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETA',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETA',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
  },
  {
    id: '001',
    libDTCI: 'MSCI-CI',
    type: 'Container ship',
    mouvement: 'ETD',
    date: '24/25/2400',
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
