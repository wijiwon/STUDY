export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return <div>search {searchParams.q}</div>;
}
