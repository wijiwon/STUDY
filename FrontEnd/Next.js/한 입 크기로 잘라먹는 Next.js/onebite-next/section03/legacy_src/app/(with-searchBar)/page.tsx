import ClientComponent from "../components/client-component";
import styles from "./page.module.css";
import ServerComponent from "../components/server-component";

export default function Home() {
  return (
    <div>
      index
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
