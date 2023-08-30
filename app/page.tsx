import styles from './page.module.css';
import Header from '@/Header';
import P5Canvas from '@/P5Canvas';

export default function Home() {
  return (
    <>
      <Header title="Creative Coding Experiments" />
      <main className={styles.main}>
        <P5Canvas />
      </main>
    </>
  );
}
