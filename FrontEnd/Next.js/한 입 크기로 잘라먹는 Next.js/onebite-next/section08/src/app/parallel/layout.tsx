import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
}) {
  return (
    <div>
      <button>
        <Link href={"parallel"}>parallel</Link>
      </button>
      <button>
        <Link href={"parallel/setting"}>parallel/setting</Link>
      </button>
      <br />
      {feed}
      {sidebar}
      {children}
    </div>
  );
}
