# 1. Link 컴포넌트를 이용한 페이지 이동

- 페이지를 변경하는 방법으로 익히 알고 있는 `<a>`는 클라이언트 사이드 렌더링 방식으로 페이지를 이동하는게 아닌 서버에게 새로운 페이지를 매번 다시 요청하는 방식으로 이동하기 때문에 우리가 원하는 방식의 페이지 이동이라고 할 수 없다. 따라서 Next에서 제공하는 `Link` 컴포넌트를 사용하도록 한다.
- href 속성으로 이동하고자 하는 페이지의 경로를 입력한다.

```ts
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        <Link href={"/search"}>search</Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
      </header>
      <Component {...pageProps} />;
    </>
  );
}
```

# 2. 이벤트나 함수를 이용한 프로그래미틱한 페이지 이동 (Programmatic Navigation)

- 사용자가 링크를 직접 클릭해서 페이지를 이동하는 것이 아닌, 특정 버튼이 클릭되었거나 특정 조건이 만족했을 경우에 어떠한 함수 내부에서 페이지를 이동하는 방법을 말한다.

- `useRouter`훅의 `push()`메소드를 사용하여 인자로 이동하고자 하는 경로를 문자열로 입력해 페이지를 이동한다.
  - Client Side Rendering 방식으로 페이지 이동이 이루어진다.
  - `push()` 메소드 말고도 `replace()`, `back()`같은 메소드도 존재한다.
    - `replace()`: 뒤로가기를 방지하며 페이지 이동
    - `back()`: 페이지를 뒤로 이동

```ts
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/test");
  };
  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        <Link href={"/search"}>search</Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />;
    </>
  );
}
```
