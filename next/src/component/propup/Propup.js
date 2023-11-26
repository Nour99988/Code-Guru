"use client";
import React from "react";
import styles from "./styles.module.css";

const Propup = ({ close, content, callback, data }) => {
  return (
    <div className={styles.container}>
      <input type="text" name="product" onChange={(e) => data(e)} />
      <input type="number" name="price" onChange={(e) => data(e)} />
      <button onClick={callback} className={styles.addButton}>
        Send
      </button>
    </div>
  );
};

export default Propup;
