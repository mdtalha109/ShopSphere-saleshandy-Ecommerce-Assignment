"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import IconButton from "@/src/components/ui/Button/IconButton";
import Button from "@/src/components/ui/Button/Button";
import styles from "./Header.module.css";


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
/**
 * Header Logo Component
 */
Header.Logo = function HeaderLogo() {
  return (
    <Link href="/" className={styles.logo}>
      <span className={styles.logoText}>ShopSphere</span>
    </Link>
  );
};

Header.Search = function HeaderSearch() {
  return (
    <>
        {/* TODO: Integrate search bar here */}
    </>
  )
};

Header.Actions = function HeaderActions() {
  const user = {
    isAuthenticated: true
  };
  const cartCount = 2;

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
      <Link href={user.isAuthenticated ? "/account" : "/login"}>
        <Button >Sign In</Button>
      </Link>
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
