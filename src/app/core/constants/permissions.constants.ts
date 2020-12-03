export const modules = [
  {
    name: 'Inscription',
    permissions: [
      { description: 'Accès au module d\'enrégistrement des élèves', name: 'accessRegistrationModule' }
    ],
  },
  {
    name: 'École',
    permissions: [
      { description: 'Accès au module Académie', name: 'accessAcademicModule' },
      { description: 'Modifier un élève', name: 'editStudent' },
      { description: 'Supprimer un élève', name: 'deleteStudent' },
      { description: 'Ajouter une classe', name: 'addClassroom' },
      { description: 'Modifier une classe', name: 'editClassroom' },
      { description: 'Supprimer une classe', name: 'deleteClassroom' },
      { description: 'Ajouter un cours', name: 'addSubject' },
      { description: 'Modifier un cours', name: 'editSubject' },
      { description: 'Supprimer un cours', name: 'deleteSubject' },
      { description: 'Ajouter un enseignant', name: 'addTeacher' },
      { description: 'Modifier un enseignant', name: 'editTeacher' },
      { description: 'Supprimer un enseignant', name: 'deleteTeacher' },
    ],
  },
  {
    name: 'Finance',
    permissions: [
      { description: 'Accès au module Finance', name: 'accessFinanceModule' },
      { description: 'Ajouter un payement', name: 'addPayment' },
      { description: 'Modifier un payement', name: 'editPayment' },
      { description: 'Supprimer un payement', name: 'deletePayment' },
    ],
  },
  {
    name: 'Finance',
    permissions: [
      { description: 'Accès au module Finance', name: 'accessNotesModule' },
      { description: `Ajouter un type d'examen`, name: 'addExaminationType' },
      { description: `Modifier un type d'examen`, name: 'editExaminationType' },
      { description: `Supprimer un type d'examen`, name: 'deleteExaminationType' },
      { description: 'Ajouter un examen', name: 'addExamination' },
      { description: 'Modifier un examen', name: 'editExamination' },
      { description: 'Supprimer un examen', name: 'deleteExamination' },
    ],
  },
  {
    name: `Gestion des utilisateurs de l'application`,
    permissions: [
      { description: 'Accès au module gestion des utilisateurs', name: 'accessStaffModule' },
    ],
  },
  {
    name: 'Finance',
    permissions: [
      { description: 'Accès aux Paramètres', name: 'accessSettingsModule' },
    ],
  }
];
