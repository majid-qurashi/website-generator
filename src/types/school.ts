export interface SchoolData {
  id?: number;
  email: string;
  name: string | null;
  tagline: string | null;
  description: string | null;
  logo: string | null;
  image: string | null;
  template: string | null;
  password?: string;
}
