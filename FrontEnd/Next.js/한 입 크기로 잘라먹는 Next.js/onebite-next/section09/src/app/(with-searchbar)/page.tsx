import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

// dynamic: 특정 페이지의 유횽을 강제로 Static, Dynamic 페이지로 설정
// 1. auto: 기본값, 아무것도 강제하지 않음
// 2. force-dynamic: 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static: 페이지를 강제로 Static 페이지로 설정
// 4. error: 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 이유가 있다면 -> 빌드시 오류 반환)
// export const dynamic = "force-dynamic";

async function AllBooks() {
  await delay(1500);
  const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: "force-cache",
  });
  if (!allRes.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const allBooks: BookData[] = await allRes.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000);
  const recoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!recoRes.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const recoBooks: BookData[] = await recoRes.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "한입 북스",
  description: "한입 북스에 등록된 도서를 만나보세요",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요",
    images: ["/thumbnail.png"],
  },
};


export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
