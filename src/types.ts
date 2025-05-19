
export interface IUser {
  uid: string;
  email: string | null;
}

export interface IEvent {
  id?: string;
  uid: string;
  name: string;
  date: string;
  description: string;
  importance: 'normal' | 'important' | 'critical';
}
