"use client";

export async function handelRequest({ data, url, method, callback, refrershToken }) {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        RefrershToken: refrershToken,
      },
    };

    if (method !== "GET") {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }

    const responseData = await res.json();

    callback && callback(responseData);
    return responseData;
  } catch (err) {
    throw new Error(err);
  }
}
