"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handelRequest } from "@/utlis/handelrequest";

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const handelResult = ({ massage }) => {
    if (massage == 400) {
      setErrorMassage("this Email alrady is exist please login");
    } else if (massage == 201) {
      router.push("/profile");
    }
  };
  const handleSignUp = async () => {
    // console.log(name, email, password);
    await handelRequest({
      method: "POST",
      url: "/api/signup",
      data: { name, email, password },
      callback: handelResult,
    });
  };
  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.header}>Sign Up</h2>

      <label className={styles.label}>Name:</label>
      <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label className={styles.label}>Email:</label>
      <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label className={styles.label}>Password:</label>
      <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className={styles.button} onClick={handleSignUp}>
        تسجيل حساب جديد
      </button>

      <p className={styles.paragraph}>
        هل لديك حساب؟{" "}
        <Link className={styles.link} href="/login">
          تسجيل الدخول
        </Link>
      </p>
      <p>{errorMassage}</p>
    </div>
  );
};

export default Page;
