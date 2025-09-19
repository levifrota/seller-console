export type Status = 'Lead' | 'Opportunity';

export interface Person {
  id: number;
  companyName: string;
  pointOfContact: string;
  phone: string;
  email: string;
  status: Status;
}

// Lead types
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
}

export interface LeadCounts {
  all: number;
  new: number;
  contacted: number;
  qualified: number;
  unqualified: number;
}

// Opportunity types
export interface Opportunity {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
  stage?: string;
  amount?: number;
  createdAt?: string;
  leadId?: string;
}

export interface OpportunityFilters {
  stage: string;
  amountRange: string;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}