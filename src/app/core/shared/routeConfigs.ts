export const menuConfig = [
  {
    finance: [
      {text: 'dashboard', url: '/finance/dashboard', submenu: null},
      {
        text: 'élèves',
        url: '/finance/students',
        submenu: [
          {text: 'payements des contributions', url: '/finance/students/payments'},
          {text: 'Etat', url: '/finance/students/state'},
          {text: 'Types de contributions', url: '/finance/students/fees'},
          {text: 'Catégories de contributions', url: '/finance/students/fee-categories'},
        ]
      },
      {
        text: 'Bilan Financier',
        url: '/finance/balance',
        submenu: [
          {text: 'Bilan', url: '/finance/balance'},
          {text: 'Types de dépenses', url: '/finance/balance/expense-types'},
          {text: 'Types de revenus', url: '/finance/balance/income-types'},
        ]
      },
    ]
  },
  {
    academy: [
      { text: 'dashboard', url: '/academy/dashboard', submenu: null },
      {
        text: 'Élèves',
        url: '/academy/students',
        submenu: [
          {text: 'Liste des élèves', url: '/academy/students/list'},
        ]
      },
      {
        text: 'Classes',
        url: '/academy/classrooms',
        submenu: [
          {text: 'Liste des classes', url: '/academy/classrooms/list'},
        ]
      },
      {
        text: 'Cours',
        url: '/academy/subjects',
        submenu: [
          {text: 'Liste des cours', url: '/academy/subjects/list'},
        ]
      },
      {
        text: 'Professeurs',
        url: '/academy/teachers',
        submenu: [
          {text: 'Liste des professeurs', url: '/academy/teachers/list'},
        ]
      },
    ]
  },
  {
    settings: [
      { text: 'paramètres généraux', url: '/settings', submenu: [
          {text: 'Informations sur l\'école', url: '/settings/school'},
          {text: 'Années scolaires', url: '/settings/schoolyears'},
        ] },
    ]
  },
  {
    registration: [
      { text: 'inscription', url: '/registration/register', submenu: null },
      { text: 'réinscription', url: '/registration/re-register', submenu: null },
    ]
  },
  {
    staff: [
      { text: 'personnel', url: '/staff/users', submenu: null },
      { text: 'rôles', url: '/staff/roles', submenu: null },
      // { text: 'réinscription', url: '/registration/re-register', submenu: null },
    ]
  },
  {
    notes: [
      { text: 'Exmaninations', url: '/notes/examinations', submenu: [
          {text: 'Liste des examinations', url: '/notes/examinations/list'},
          {text: 'Types d\'examinations', url: '/notes/examinations/types'},
        ] },
      { text: 'Bulletins', url: '/notes/bulletins', submenu: null },
    ]
  },
];
