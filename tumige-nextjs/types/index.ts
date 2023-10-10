export type AuthForm = {
  email: string;
  password: string;
};
export type EditedTask = {
  id: number;
  title: string;
  note?: string | null;
  tag?: string | null;
  rank?: number | null;
  fav?: boolean | null;
  file?: File | null;
};
