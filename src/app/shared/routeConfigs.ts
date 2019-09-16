export const menuConfig = [
  {
    finance: [
      {text: 'dashboard', url: '/finance/dashboard', submenu: null},
      {
        text: 'students',
        url: '/finance/students',
        submenu: [
          {text: 'inscription', url: '/finance/students/registration'},
          {text: 'élève/classes', url: '/finance/students/list'},
          {text: 'contributions', url: '/finance/students/scholarships'},
          {text: 'Types de contributions', url: '/finance/students/scholarships-types'},
        ]
      },
      {
        text: 'Dépenses',
        url: '/finance/expenses',
        submenu: [
          {text: 'liste des dépenses', url: '/finance/expenses/list'},
          {text: 'types de dépenses', url: '/finance/expenses/expenses-type'},
        ]
      },
      {
        text: 'Revenus',
        url: '/finance/incomes',
        submenu: [
          {text: 'liste des revenus', url: '/finance/incomes/list'},
          {text: 'types de revenus', url: '/finance/incomes/incomes-type'},
        ]
      }
    ]
  },
  {

  },
];
