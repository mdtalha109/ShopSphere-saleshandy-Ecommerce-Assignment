import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.heading}>Product Not Found</h2>
      <p className={styles.description}>
        The product you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link href="/" className={styles.button}>
        Back to Home
      </Link>
    </div>
  );
}
