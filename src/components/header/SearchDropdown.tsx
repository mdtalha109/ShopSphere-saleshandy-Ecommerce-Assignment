import { Product } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import styles from "./SearchDropdown.module.css";

interface SearchDropdownProps {
  products: Product[];
  isLoading: boolean;
  searchQuery: string;
  onClose: () => void;
  onItemClick: () => void;
}

export function SearchDropdown({
  products,
  isLoading,
  searchQuery,
  onClose,
  onItemClick,
}: SearchDropdownProps) {
  if (!searchQuery.trim()) {
    return null;
  }

  return (
    <div className={styles.dropdown}>
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>Searching...</span>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className={styles.results}>
            {products.map((product) => {
              const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
              
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className={styles.resultItem}
                  onClick={onItemClick}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={primaryImage.url}
                      alt={product.title}
                      width={48}
                      height={48}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.content}>
                    <div className={styles.brand}>{product.brand.name}</div>
                    <div className={styles.title}>{product.title}</div>
                    <div className={styles.price}>
                      ₹{product.price.current.toLocaleString()}
                      {product.price.onSale && (
                        <span className={styles.originalPrice}>
                          ₹{product.price.original.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            href={`/search?q=${encodeURIComponent(searchQuery)}`}
            className={styles.viewAll}
            onClick={onItemClick}
          >
            <Search size={16} />
            View all results for "{searchQuery}"
          </Link>
        </>
      ) : (
        <div className={styles.empty}>
          <Search size={24} />
          <p>No products found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
