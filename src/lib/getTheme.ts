'use server'

import { cookies } from "next/headers";

export default async function getTheme(): Promise<string> {

  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  return theme?.value ?? 'light';
}