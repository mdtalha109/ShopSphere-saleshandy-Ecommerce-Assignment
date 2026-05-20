import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";
import styles from "./search.module.css";

export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white">
        <div className={styles.status}>
          <div className={styles.spinner} />
          <p>Loading search...</p>
        </div>
      </main>
    }>
      <SearchPageClient />
    </Suspense>
  );
}

