import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";

// export const dynamic = "error";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  await delay(1500);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`,
    { cache: "force-cache" }
  );
  if (!res.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const searchBooks: BookData[] = await res.json();
  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
