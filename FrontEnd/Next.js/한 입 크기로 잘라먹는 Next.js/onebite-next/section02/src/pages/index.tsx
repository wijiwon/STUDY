import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRendomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRendomBooks();
  // allBooks가 먼저 불러와지고나서 recoBooks가 불러와지는 직렬구조로 데이터가 불러와진다.

  // Promis.all([])은 병렬구조로 데이터를 한꺼번에 불러와 페이지를 조금 더 빠르게 렌더링 할 수 있다.
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRendomBooks(),
  ]);
  return {
    props: { allBooks, recoBooks },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
