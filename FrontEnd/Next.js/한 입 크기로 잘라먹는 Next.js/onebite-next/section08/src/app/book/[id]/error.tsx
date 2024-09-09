"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          // 하나의 콜백 함수를 인수로 전달받아 콜백 함수 안에 들어있는 UI를 변경시키는 작업들을 모두 일괄적으로 처리하게 된다.
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링함
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
