import styles from '../page.module.css';
import Header from '@/Header';

export default function Home() {
  return (
    <>
      <Header title="Creative Coding Experiments" />
      <main className={styles.main}>
        <ul>
          <li>Gather from gist</li>
          <li>
            Joan Taylor patterns
            <ul>
              <li>http://taylortiling.com/rhombus.html</li>
            </ul>
          </li>
          <li>LennyJPG</li>
          <li>Inconvergent</li>
          <li>Matt Dslauires</li>
          <li>Frederik Vanhoutte</li>
          <li>Universal Everything</li>
          <li>Dirty Vertex</li>
          <li>14fyk</li>
          <li>Sea life book, etc.</li>
          <li>HyperGlu</li>
        </ul>
      </main>
    </>
  );
}
