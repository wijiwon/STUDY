"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  if (!bookId || !content || !author) {
    return;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: "POST", body: JSON.stringify({ bookId, content, author }) }
    );

    console.log(res.status);
    // 1. revalidatePath('재검증 주소'): 특정 주소에 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2. revalidatePath('페이지 컴포넌트가 작성된 폴더 또는 파일의 경로', 'page' ): 특정 경로의 모든 동적 페이지를 재검증
    // /book/[id]의 형태를 갖는 모든 동적 페이지들이 전부 재검증된다.
    // revalidatePath("/book/[id]", "page");

    // 3. revalidatePath('레이아웃 파일의 경로', 'layout'): 특정 레이아웃을 갖는 모든 페이지 재검증
    // 해당 레이아웃을 갖는 모든 페이지들을 한꺼번에 재검증하기 원하면 해당 방법 사용
    // revalidatePath("(/with-searchbar)", "layout");

    // 4. revalidatePath('/', 'layout'): 모든 데이터를 재검증
    // revalidatePath("/", "layout");

    // 5. revalidateTag('tag'): 태그 값을 기준으로 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
