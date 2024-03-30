export interface ContactBody {
  email?: string | null;
  phoneNumber?: string | null;
}

export interface ContactResponse {
  primaryContactId: number;
  emails: string[]; // first element being email of primary contact
  phoneNumbers: string[]; // first element being phoneNumber of primary contact
  secondaryContactIds: number[]; // Array of all Contact IDs that are "secondary" to the primary contact
}

export interface Contact {
  id?: number;
  phoneNumber?: string | null;
  email?: string | null;
  linkedId?: number | null;
  linkPrecedence: linkPrecedence;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface UpdateContactParams {
  id: number;
  linkedId: number;
  linkPrecedence: linkPrecedence;
  updatedAt: Date;
}

export enum linkPrecedence {
  primary = "primary",
  secondary = "secondary",
}
