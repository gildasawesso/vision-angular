export const menuConfig = [
  {
    finance: [
      {text: 'dashboard', url: '/finance/dashboard', submenu: null},
      {
        text: 'élèves',
        url: '/finance/students',
        submenu: [
          {text: 'payements des contributions', url: '/finance/students/payments'},
          {text: 'élèves & classes', url: '/finance/students/list'},
          {text: 'Types de contributions', url: '/finance/students/fees'},
          {text: 'Catégories de contributions', url: '/finance/students/fee-categories'},
        ]
      },
      {
        text: 'Dépenses',
        url: '/finance/expenses',
        submenu: [
          {text: 'liste des dépenses', url: '/finance/expenses/list'},
          {text: 'types de dépenses', url: '/finance/expenses/expense-types'},
        ]
      },
      {
        text: 'Revenus',
        url: '/finance/incomes',
        submenu: [
          {text: 'liste des revenus', url: '/finance/incomes/list'},
          {text: 'types de revenus', url: '/finance/incomes/income-types'},
        ]
      }
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
      { text: 'paramètres généraux', url: '/settings', submenu: null },
    ]
  },
  {
    registration: [
      { text: 'inscription', url: '/registration/register', submenu: null },
      // { text: 'réinscription', url: '/registration/re-register', submenu: null },
    ]
  },
  {
    staff: [
      { text: 'personnel', url: '/staff/users', submenu: null },
      { text: 'rôles', url: '/staff/roles', submenu: null },
      // { text: 'réinscription', url: '/registration/re-register', submenu: null },
    ]
  },
];
