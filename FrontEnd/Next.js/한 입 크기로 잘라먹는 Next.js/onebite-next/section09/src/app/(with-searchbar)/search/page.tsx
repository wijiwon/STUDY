import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

// export const dynamic = "error";

async function SearchRes({ q }: { q: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
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

type Props = {
  searchParams: { q?: string };
};

export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `${searchParams.q} : 한입 북스 검색`,
    description: `${searchParams.q} 검색 결과 입니다.`,
    openGraph: {
      title: `${searchParams.q} : 한입 북스 검색`,
      description: `"${searchParams.q}" 검색 결과 입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

export default function Page({ searchParams }: Props) {
  return (
    <Suspense
      key={searchParams.q || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchRes q={searchParams.q || ""} />
    </Suspense>
  );
}
