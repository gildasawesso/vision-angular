export class Fee {
  name: string;
  amount: number;
  isScholarship: boolean;
  tranches: Array<{ name: string, dueDate: Date }>;
  deadline: Date;
}
