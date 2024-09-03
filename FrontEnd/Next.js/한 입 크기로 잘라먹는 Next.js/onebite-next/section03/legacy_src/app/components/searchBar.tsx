"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChangSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };
  return (
    <div>
      <input type="text" value={search} onChange={onChangSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
