import Head from "next/head";
import styles from "../styles/Home.module.css";
import TaskList from "./TaskList";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>Asana Task List</h1>
      </main>
      <TaskList />
    </div>
  );
}
