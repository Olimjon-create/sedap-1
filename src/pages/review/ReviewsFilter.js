import React from "react";
import styles from "@/styles/order.module.css";
import Image from "next/image";

function ReviewsFilter() {
  return (
    <div>
      <div className={styles["status"]}>
        <Image
          src="/allstatus.png"
          alt="All status filter icon"
          width={20}
          height={20}
        />{" "}
        <select>
          <option>Filter</option>
          <option>Name</option>
          <option>ID</option>
        </select>
      </div>
    </div>
  );
}

export default ReviewsFilter;
