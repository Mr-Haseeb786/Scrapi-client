import React, { useEffect, useState } from "react";
import style from "./toastanim.module.css";

const Toast = ({ msg, category, resetFunc }) => {
  const [isVisible, setisVisible] = useState(true);
  const [playEndAnim, setPlayEndAnim] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPlayEndAnim(true);
    }, 2700);

    setTimeout(() => {
      return resetFunc("");
    }, 3000);
  }, []);

  if (!isVisible) return null;

  let bgColor = null;

  switch (category) {
    case "error":
      bgColor = "bg-red-500";
      break;

    case "success":
      bgColor = "bg-green-500";
      break;

    default:
      bgColor = "bg-blue-500";
      break;
  }

  return (
    <aside
      className={`absolute top-24 left-1/2 translate-x-1/2 ${bgColor} max-w-max font-semibold px-4 py-5 z-10 rounded-md text-lg ${
        style.toastAnimationStart
      } ${playEndAnim && style.toastEndAnimation} `}
    >
      <div>{msg}</div>
    </aside>
  );
};

export default Toast;
