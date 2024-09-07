"use client"; // 클라이언트 컴포넌트로 변경

import { useEffect, useState } from "react";
import { BookData } from "@/types";

function Footer() {
  const [bookCount, setBookCount] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
          {
            cache: "force-cache",
          }
        );
        const books: BookData[] = await res.json();
        setBookCount(books.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}

export default Footer;
