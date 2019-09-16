export class Schoolyear {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: { type: Schema.Types.ObjectId, ref: 'Media' },
}
