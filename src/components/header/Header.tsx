"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import IconButton from "@/src/components/ui/Button/IconButton";
import Button from "@/src/components/ui/Button/Button";
import { SearchBar } from "./SearchBar";
import styles from "./Header.module.css";
import { useCart } from "@/src/hooks/cart";
import { useAuth } from "@/src/features/auth";
import UserMenu from "./UserMenu/UserMenu";


interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
      <header className={styles.header}>
        <div className={styles.container}>
          {children}
        </div>
      </header>

  );
}

Header.Logo = function HeaderLogo() {
  return (
    <Link href="/" className={styles.logo}>
      <span className={styles.logoText}>ShopSphere</span>
    </Link>
  );
};

Header.Search = function HeaderSearch() {
  return <SearchBar className={styles.searchForm} />;
};

Header.Actions = function HeaderActions() {
    const cartCount = useCart()?.state?.items?.length; 
    const { isAuthenticated } = useAuth();

  return (
    <div className={styles.actions}>
      <Link href="/cart" aria-label={`Cart with ${cartCount} items`}>
        <IconButton
          icon={<ShoppingCart />}
          label="Shopping cart"
          variant="ghost"
          badge={cartCount > 0 ? cartCount : undefined}
        />
      </Link>
      {isAuthenticated ? (
        <UserMenu />
      ) : (
        <Link href="/login">
          <Button size="small">Sign In</Button>
        </Link>
      )}
    </div>
  );
};


export function HeaderLayout() {
  return (
    <Header>
      <Header.Logo />
      <Header.Search />
      <Header.Actions />
    </Header>
  );
}
