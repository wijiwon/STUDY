import { BookData } from "@/types";

// 책 한권의 값을 받아오는 것이기 때문에 배열 형태가 아닌 BookData[]가 아닌 BookData로 받아오는 것이다. 서버에서 반환이 실패할 수 있기 때문에 null 값도 확장한다.
export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  const url = `https://onebite-books-server-main-one.vercel.app/book/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
