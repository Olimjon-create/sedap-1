import React from "react";
import PageTitle from "@/components/common/PageTitle";
import ReviewsTable from "./ReviewsTable";
import styles from "@/styles/order.module.css";
import ReviewsFilter from "./ReviewsFilter";

export default function CustomersList() {
  return (
    <>
      <div className={styles["orderDiv"]}>
        <PageTitle title="" subtitle="" />
        <div className={styles["calendar"]}>
          <ReviewsFilter />
        </div>
      </div>
      <div className={"tableData"}>
        <ReviewsTable />
      </div>
      {/* <PageTitle

      />
      <CustomerTable /> */}
    </>
  );
}
