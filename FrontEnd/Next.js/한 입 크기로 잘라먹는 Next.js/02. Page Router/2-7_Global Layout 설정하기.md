# 1. Global Layout?

- Next.js App의 모든 페이지에 일괄적으로 적용되는 레이아웃

# 2. Global Layout 설정하기

1. \_app.tsx는 모든 컴포넌트의 부모 컴포넌트이기 때문에 해당 컴포넌트에서 글로벌 레이아웃을 설정한다. - 단, 글로벌 레이아웃이 복잡해지면 가독성이 떨어지게 되므로 레이아웃을 위한 별도의 컴포넌트 파일을 따로 생성하여 \_app.tsx에 적용시킨다.

   - \_app.tsx

   ```ts
   import GlobalLayout from "@/components/global-layout";
   import "@/styles/globals.css";
   import type { AppProps } from "next/app";

   export default function App({ Component, pageProps }: AppProps) {
     return (
       <GlobalLayout>
         <Component {...pageProps} />
       </GlobalLayout>
     );
   }
   ```
.container {
  background-color: white;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;

  box-shadow: rgba(100, 100, 100, 0.2) 0px 0px 29px 0px;
  padding: 0px 15px;
}

.header {
  height: 60px;
  font-weight: bold;
  font-size: 18px;
  line-height: 60px;
}

.header > a {
  color: black;
  text-decoration: none;
}

.main {
  padding-top: 10px;
}

.footer {
  padding: 100px 0px;
  color: gray;
}

   - src/components/global-layout.tsx: 글로벌 레이아웃을 위한 컴포넌트. 모든 페이지에 적용되어야 하는 헤더, 푸터 등의 페이지 컴포넌트 구조를 정의한다.

   ```ts
   import { ReactNode } from "react";
   import Link from "next/link";

   export default function GlobalLayout({ children }: { children: ReactNode }) {
     return (
       <div>
         <header>헤더</header>
         <main>{children}</main>
         <footer>푸터</footer>
       </div>
     );
   }
   ```

2. 퍼블리싱을 위해 css 파일을 생성하여 각 태그에 맞게 스타일을 적용시킨다.

   - global-layout.tsx

   ```ts
   import { ReactNode } from "react";
   import Link from "next/link";
   import style from "./global-layout.module.css";

   export default function GlobalLayout({ children }: { children: ReactNode }) {
     return (
       <div className={style.container}>
         <header className={style.header}>
           <Link href={"/"}>📚 ONEBITE BOOKS</Link>
         </header>
         <main className={style.main}>{children}</main>
         <footer className={style.footer}>제작 @Weeeji</footer>
       </div>
     );
   }
   ```

   - global-layout.module.css

   ```css
   .container {
     background-color: white;
     max-width: 600px;
     min-height: 100vh;
     margin: 0 auto;

     box-shadow: rgba(100, 100, 100, 0.2) 0px 0px 29px 0px;
     padding: 0px 15px;
   }

   .header {
     height: 60px;
     font-weight: bold;
     font-size: 18px;
     line-height: 60px;
   }

   .header > a {
     color: black;
     text-decoration: none;
   }

   .main {
     padding-top: 10px;
   }

   .footer {
     padding: 100px 0px;
     color: gray;
   }
   ```
