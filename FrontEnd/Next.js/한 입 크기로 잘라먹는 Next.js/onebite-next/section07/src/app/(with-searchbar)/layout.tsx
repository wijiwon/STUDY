import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 해당 컴포넌트가 렌더링된 시간을 초 단위로 표시하기 위한 설정 */}
      {/* <div>{new Date().toLocaleString()}</div> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
