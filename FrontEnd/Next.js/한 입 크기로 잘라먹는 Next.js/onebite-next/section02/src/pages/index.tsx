import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import fetchRendomBooks from "@/lib/fetch-random-books";
import Head from "next/head";
import { InferGetStaticPropsType } from "next/types";

// export const getServerSideProps = async () => {
//   // const allBooks = await fetchBooks();
//   // const recoBooks = await fetchRendomBooks();
//   // allBooks가 먼저 불러와지고나서 recoBooks가 불러와지는 직렬구조로 데이터가 불러와진다.

//   // Promis.all([])은 병렬구조로 데이터를 한꺼번에 불러와 페이지를 조금 더 빠르게 렌더링 할 수 있다.
//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRendomBooks(),
//   ]);
//   return {
//     props: { allBooks, recoBooks },
//   };
// };

export const getStaticProps = async () => {
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
