import { BookData } from "@/types";

export default async function fetchRendomBooks(): Promise<BookData[]> {
  const url = `https://onebite-books-server-main-one.vercel.app/book/random`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
