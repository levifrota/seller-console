export type Status = 'Lead' | 'Opportunity';

export interface Person {
  id: number;
  companyName: string;
  pointOfContact: string;
  phone: string;
  email: string;
  status: Status;
}