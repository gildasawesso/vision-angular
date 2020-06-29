import {permissionsConstants} from '../core/constants/permissions.constants';

export const homeMenu = [
  { image: 'registration', title: 'Inscription', url: 'registration', permission: permissionsConstants.accessRegistration },
  { image: 'academic', title: 'École', url: 'academy', permission: permissionsConstants.accessAcademic },
  { image: 'finance', title: 'Finance', url: 'finance', permission: permissionsConstants.accessFinance },
  { image: 'staff', title: 'Personnel', url: 'staff', permission: permissionsConstants.accessStaff },
  { image: 'notes', title: 'Notes', url: 'notes', permission: permissionsConstants.accessNotes },
  { image: 'settings', title: 'Paramètres', url: 'settings', permission: permissionsConstants.accessSettings }
];
