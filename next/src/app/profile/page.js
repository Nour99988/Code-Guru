"use client";
import Propup from "@/component/propup/Propup";
import { handelRequest } from "@/utlis/handelrequest";
import useLocalStorage from "@/utlis/useLocalStorage";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

function Page() {
  const [shoePropup, setShowPropup] = useState(false);
  const [value, setValue] = useLocalStorage("refreshToken", "");
  const [exponse, setExponse] = useState({
    product: "",
    price: "",
  });
  const [allExponses, setAllExponses] = useState([]);

  const setData = (data) => {
    console.log(data);

    setAllExponses(data.message);
  };

  const fetchAllExponses = async () => {
    await handelRequest({ url: "/api/exponses", method: "GET", callback: setData, refrershToken: value });
  };

  useEffect(() => {
    fetchAllExponses();
  }, []);
  const addExponse = async () => {
    console.log("fetch");
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
    console.log(exponse);
  };
  return (
    <div>
      {/* <div className={styles.myData}>my Data</div> */}
      <Link href="logout">Logout</Link>
      <button className={styles.addButton} onClick={() => setShowPropup(!shoePropup)}>
        Add invoic
      </button>
      {shoePropup && <Propup data={handelChange} callback={addExponse} />}
      <div className={styles.dataContainer}>
        {allExponses.length > 1 &&
          allExponses.map((item, index) => (
            <div key={index} className={styles.dataItem}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.price}>{item.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Page;
