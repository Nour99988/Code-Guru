"use client";
import Propup from "@/component/propup/Propup";
import { handelRequest } from "@/utlis/handelrequest";
import useLocalStorage from "@/utlis/useLocalStorage";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

function Page() {
  const [shoePropup, setShowPropup] = useState(false);
  const [value, setValue] = useLocalStorage("refreshToken", "");
  const [exponse, setExponse] = useState({
    product: "",
    price: "",
  });
  const [allExponses, setAllExponses] = useState([]);

  const setData = (data) => {
    console.log(data.message);
    setAllExponses(data.message);
  };

  const fetchAllExponses = async () => {
    await handelRequest({ url: "/api/exponses", method: "GET", callback: setData, refrershToken: value });
  };

  useEffect(() => {
    fetchAllExponses();
  }, []);
  const addExponse = async () => {
    await handelRequest({
      url: "/api/exponses",
      data: { title: exponse.product, cost: exponse.price, refreshToken: value },
      method: "POST",
      refreshToken: value,
      callback: fetchAllExponses,
    });
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setExponse((prev) => ({ ...prev, [name]: value }));
  };
  const router = useRouter();
  const logout = async () => {
    const res = await fetch("/api/logout");
    console.log(res);
    router.push("/login");
  };
  return (
    <div className={styles.asBody}>
      {/* <div className={styles.myData}>my Data</div> */}
      <div className={styles.top}>
        <button onClick={logout} href="logout" className={styles.logout}>
          Logout
        </button>
        <button className={styles.addButton} onClick={() => setShowPropup(!shoePropup)}>
          Add invoic
        </button>
      </div>
      {shoePropup && <Propup data={handelChange} callback={addExponse} />}
      <div className={styles.dataContainer}>
        {allExponses.length > 1 &&
          allExponses.map((item, index) => (
            <div key={index} className={styles.box}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.price}>{item.cost} Dha</p>
              <p>{item.date.toString().split("T")[0]}</p>
              <p>{item.date.toString().split(" ")[1]}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Page;
