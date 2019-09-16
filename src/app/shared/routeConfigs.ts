export const menuConfig = [
  {
    finance: [
      {text: 'dashboard', url: '/finance/dashboard', submenu: null},
      {
        text: 'élèves',
        url: '/finance/students',
        submenu: [
          {text: 'inscription', url: '/finance/students/registration'},
          {text: 'payements des contributions', url: '/finance/students/payments'},
          {text: 'élèves & classes', url: '/finance/students/list'},
          {text: 'contributions', url: '/finance/students/fees'},
          {text: 'Types de contributions', url: '/finance/students/fee-types'},
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
];
