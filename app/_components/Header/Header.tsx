import Link from 'next/link';
import styles from './Header.module.css';

const Header = ({ title }: { title: string }) => (
  <header className={styles.header}>
    <Link href="/" className={styles.link}>
      {title}
    </Link>
  </header>
);

export default Header;
