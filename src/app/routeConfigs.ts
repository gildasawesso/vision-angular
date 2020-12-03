export const menuConfig = [
  {
    finance: [
      {text: 'dashboard', url: '/finance/dashboard', icon: 'pie_chart_outline'},
      {text: 'payements', url: '/finance/payments', icon: 'monetization_on_outline'},
      {text: 'Etat', url: '/finance/state', icon: 'check_circle_outline'},
      {text: 'Transactions', url: '/finance/transactions', icon: 'account_balance'},
      {text: 'contributions', url: '/finance/fees', icon: 'device_hub'},
      {text: 'Revenus', url: '/finance/income-types', icon: 'arrow_forward_ios'},
      {text: 'Dépenses', url: '/finance/expense-types', icon: 'arrow_back_ios'},
    ]
  },
  {
    academy: [
      { text: 'dashboard', url: '/academy/dashboard', icon: 'pie_chart_outline' },
      {text: 'Élèves', url: '/academy/students', icon: 'group'},
      {text: 'Classes', url: '/academy/classrooms', icon: 'store'},
      {text: 'Cours', url: '/academy/subjects', icon: 'menu_book'},
      {text: 'Professeurs', url: '/academy/teachers', icon: 'supervisor_account'},
    ]
  },
  {
    settings: [
      {text: 'École', url: '/settings/school', icon: 'school'},
      {text: 'Années scolaires', url: '/settings/schoolyears', icon: 'event'},
    ]
  },
  {
    registration: [
      { text: 'inscription', url: '/registration/register', icon: 'person_outline' },
      { text: 'réinscription', url: '/registration/re-register', icon: 'refresh' },
    ]
  },
  {
    staff: [
      { text: 'personnel', url: '/staff/list', icon: 'people' },
      { text: 'rôles', url: '/staff/roles', icon: 'admin_panel_settings' },
    ]
  },
  {
    notes: [
      { text: 'Examinations', url: '/notes/examinations/list', icon: 'science'},
      { text: 'Types examinations', url: '/notes/examinations/types', icon: 'reorder'},
      { text: 'Bulletins', url: '/notes/bulletins', icon: 'emoji_events' },
    ]
  },
];
