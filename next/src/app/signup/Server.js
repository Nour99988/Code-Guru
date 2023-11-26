import { cookies } from "next/headers";
import { handelrequest } from "@/utlis/handelrequest";
import styles from "./styles.module.css";
import Link from "next/link";
const Page = () => {
  async function create(formData) {
    "use server";
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    // const data = {}
    console.log(data);
    const res = await handelrequest(data, "http://localhost:4000/api/signup", "POST");
    console.log("from server action", res.headers.getSetCookie());
    const cookies = res.headers.getSetCookie();

    // تحويل القيمة المسترجعة إلى نص (string)
    const token = cookies.join("; ");
    // const data = formData.get;
    if (cookies) {
      cookies().set({
        name: "accesstoken",
        value: "token",
        httpOnly: true,
        path: "/",
      });
    }
    console.log(token);
  }
  const create = async () => {
    // "use server";
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify("dsadasd"),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await res.json());
  };
  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.header}>Sign Up</h2>
      <form action={create}>
        <label className={styles.label}>Name:</label>
        <input className={styles.input} type="text" name="name" />

        <label className={styles.label}>Email:</label>
        <input className={styles.input} type="email" name="email" />

        <label className={styles.label}>Password:</label>
        <input className={styles.input} type="password" name="password" />

        <button className={styles.button} type="submit">
          تسجيل حساب جديد
        </button>
      </form>
      <p className={styles.paragraph}>
        هل لديك حساب؟{" "}
        <Link className={styles.link} href="/login">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
};

export default Page;
