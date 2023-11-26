"use client";
// Login.js

import { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handelRequest } from "@/utlis/handelrequest";
import useLocalStorage from "@/utlis/useLocalStorage";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useLocalStorage("refreshToken", "");
  const router = useRouter();
  const handelLogin = ({ massage, refreshToken }) => {
    console.log(massage);
    console.log(value);
    setValue(refreshToken);
    if (massage == 400) {
      setErrorMassage("this Email alrady is exist please login");
    } else if (massage == 200) {
      console.log(refreshToken);
      router.push("/profile");
    }
  };
  const handleLogin = async () => {
    await handelRequest({ url: "/api/login", data: { name, email, password }, method: "POST", callback: handelLogin });
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.header}>Login</h2>
      <label className={styles.label}>Email:</label>
      <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label className={styles.label}>Password:</label>
      <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className={styles.button} onClick={handleLogin}>
        Login
      </button>

      <p className={styles.paragraph}>
        Don't You have an Account
        <Link className={styles.link} href="/signup">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Page;
