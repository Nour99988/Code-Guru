"use client";
import React from "react";

const Propup = ({ close, content, callback, data }) => {
  return (
    <div>
      <input type="text" name="product" onChange={(e) => data(e)} />
      <input type="number" name="price" onChange={(e) => data(e)} />
      <button onClick={callback}>SAVE</button>
    </div>
  );
};

export default Propup;
