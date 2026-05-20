"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, Package } from "lucide-react";
import { useAuth } from "@/src/features/auth";
import toast from 'react-hot-toast';
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    toast.success('Successfully logged out');
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button
        className={styles.userButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <User className={styles.userIcon} />
        <span className={styles.userEmail}>{user.email}</span>
        {user.isGuest && (
          <span className={styles.guestBadge}>Guest</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownEmail}>{user.email}</div>
            <div className={styles.dropdownLabel}>
              {user.isGuest ? "Guest Account" : ""}
            </div>
          </div>
          <div className={styles.dropdownActions}>            
            <Link href="/orders" className={styles.menuLink} onClick={() => setIsOpen(false)}>
              <Package className={styles.menuIcon} />
              My Orders
            </Link>            <button
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              <LogOut className={styles.logoutIcon} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserMenu;
