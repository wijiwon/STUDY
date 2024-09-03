import ClientComponent from "../../components/client-component";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div>
      search {searchParams.q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
