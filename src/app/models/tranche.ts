export class Fee {
  '_id': string;
  name: string;
  amount: number;
  isSchoolFee: boolean;
  tranches: Array<{ name: string, dueDate: Date }>;
  deadline: Date;
}
