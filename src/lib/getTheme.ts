import { cookies } from "next/headers";

export default function getTheme(): string {

  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  return theme?.value ?? 'light';
}