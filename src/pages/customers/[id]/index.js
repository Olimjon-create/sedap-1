import Head from "next/head";
import MainLayout from "@/components/common/layouts/MainLayout";
import { useRouter } from "next/router";
import { customerListData } from "@/data";
import { useEffect, useState } from "react";
import PageTitle from "@/components/common/PageTitle";
import styles from "@/styles/customerDetail.module.css";
import IconMaker from "@/components/pages/customers/IconMaker";
import CustomBtn from "@/components/pages/customers/CustomBtn";
import CreditCard from "@/components/pages/customers/CreditCard";
import Grid from "@mui/material/Grid";
import Image from "next/image";

export default function CustomerDetail() {
  const router = useRouter();
  const orderId = router.query.id;
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Monthly");
  const [mostLikedFilter, setMostLikedFilter] = useState("Monthly");

  useEffect(() => {
    const topilganOrder = customerListData.find(
      (order) => order.customerId == router.query.id
    );
    setCurrentCustomer(topilganOrder);
  }, [router]);

  return (
    <>
      <Head>
        <title>
          {currentCustomer
            ? "Order Detail: " + currentCustomer.customerId
            : "Tovar not found"}
          if(!currentCustomer){" "}
          {console.log(currentCustomer, "setCurrentCustomer")}
        </title>
      </Head>
      <div>
        {currentCustomer ? (
          <>
            <PageTitle
              title="Customer Detail"
              subtitle="Here your Customer Detail Profile"
            />
            <div
              className={styles.wrap}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <div className={styles.userData}>
                <div className={styles.userAva}></div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className={styles.customerDataDv}>
                      <h2>{currentCustomer.customerName}</h2>
                      <p className={styles.p}>{currentCustomer.field}</p>
                      <p>{currentCustomer.location}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <CustomBtn back="#00B07426" icon="/customBtn1.png" />
                      <CustomBtn back="#5E6C9326" icon="/customBtn2.png" />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "40px",
                    }}
                  >
                    <IconMaker
                      back="#2D9CDB26"
                      icon="/customerIcon1.png"
                      text={currentCustomer.email}
                    />
                    <IconMaker
                      back="#2D9CDB26"
                      icon="/customerIcon2.png"
                      text={currentCustomer.phone}
                    />
                    <IconMaker
                      back="#2D9CDB26"
                      icon="/customerIcon3.png"
                      text={currentCustomer.job}
                    />
                  </div>
                </div>
              </div>
              <CreditCard card={currentCustomer.creditCard} />
            </div>
            <Grid container spacing={4} sx={{ marginTop: "40px" }}>
              <Grid
                size={6}
                sx={{
                  borderRadius: "24px",
                  border: "1px solid rgb(236,236,236)",
                  backgroundColor: "#fdfdfd",
                }}
              >
                <div className={styles["btnAndName"]}>
                  <div className={styles["mostOrdered"]}>
                    <p>Most Ordered Food</p>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                  <div className={styles["mostOrderBtns"]}>
                    <button
                      className={
                        activeFilter === "Monthly" ? styles.active : ""
                      }
                      onClick={() => setActiveFilter("Monthly")}
                    >
                      Monthly
                    </button>
                    <button
                      className={activeFilter === "Weekly" ? styles.active : ""}
                      onClick={() => setActiveFilter("Weekly")}
                    >
                      Weekly
                    </button>
                    <button
                      className={activeFilter === "Daily" ? styles.active : ""}
                      onClick={() => setActiveFilter("Daily")}
                    >
                      Daily
                    </button>
                  </div>
                </div>
                {currentCustomer.items.map((item) => (
                  <Order key={currentCustomer.id} item={item} />
                ))}
              </Grid>
              <Grid
                size={6}
                sx={{
                  borderRadius: "24px",
                  border: "1px solid rgb(236,236,236)",
                  backgroundColor: "#fdfdfd",
                }}
              >
                <div className={styles["btnAndName"]}>
                  <div className={styles["mostOrdered"]}>
                    <p>Most Liked Food</p>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                  <div className={styles["mostOrderBtns"]}>
                    <button
                      className={
                        mostLikedFilter === "Monthly" ? styles.active : ""
                      }
                      onClick={() => setMostLikedFilter("Monthly")}
                    >
                      Monthly
                    </button>
                    <button
                      className={
                        mostLikedFilter === "Weekly" ? styles.active : ""
                      }
                      onClick={() => setMostLikedFilter("Weekly")}
                    >
                      Weekly
                    </button>
                    <button
                      className={
                        mostLikedFilter === "Daily" ? styles.active : ""
                      }
                      onClick={() => setMostLikedFilter("Daily")}
                    >
                      Daily
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </>
        ) : (
          <p
            style={{
              fontSize: "50px",
              fontWeight: "bolder",
            }}
          >
            Tovar not found
          </p>
        )}
      </div>
    </>
  );
}

function Order(props) {
  const { item } = props;
  return (
    <Grid container sx={{ padding: "15px 30px" }}>
      <div
        style={{
          borderRadius: "16px",
          background: "#B9BBBD",
          width: "87px",
          height: "87px",
        }}
      ></div>
      <div className={styles["middle"]}>
        <p>{item.foodName}</p>
        <p>{item.food}</p>
        <p>
          Serves for {item.person} Person | {item.min}mins
        </p>
      </div>
      <p>${item.price}</p>
      <button
        style={{
          background: "unset",
          border: "none",
          marginLeft: "32px",
          cursor: "pointer",
        }}
      >
        <Image src="/dotBlack.png" alt="" width={24} height={24} />
      </button>
    </Grid>
  );
}

CustomerDetail.getLayout = (pageProps) => (
  <MainLayout>
    <CustomerDetail {...pageProps} />
  </MainLayout>
);
