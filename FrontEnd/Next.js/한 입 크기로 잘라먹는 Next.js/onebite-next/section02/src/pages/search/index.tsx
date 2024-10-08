import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
} from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";

//export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   GetStaticPropsContext는 빌드 타임에 실행되기 때문에 사용자가 직접 입력하는 검색어 등의 정보인 쿼리스트링은 읽어올 수가 없다.
//   때문에 정적 페이지로 사용하고 싶다면 리액트처럼 페이지 컴포넌트에서 데이터 페칭을 진행해야 한다.
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return { props: { books } };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
