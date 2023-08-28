import { useRouter } from 'next/router'
import React from 'react'
import styles from './navbar.module.css';

export default function Navbar() {
    const router=useRouter();
    const logoutHandler=()=>{
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
      router.push('/')
    }
  return (
    <div className={styles.navbarContainer}> 
    <button className={styles.logoutButton} onClick={logoutHandler}>Logout</button> 
  </div>
  )
}