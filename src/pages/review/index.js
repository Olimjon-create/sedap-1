import React from "react";
import styles from "../../styles/Reviews.module.css";
import Image from "next/image";
import MainLayout from "@/components/common/layouts/MainLayout";
function ReviewsTable() {
  const ReviewArr = [
    {
      name: "Chicken Curry Special with Cucumber",
      firstName: "MAIN COURSE",
      Text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
      RoleName: "Roberto Jr.",
      RoleSurName: "Graphic Design",
      CategoryImg: "/star.png",
      number: "4.5",
    },
    {
      name: "Chicken Curry Special with Cucumber",
      firstName: "MAIN COURSE",
      Text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
      RoleName: "Roberto Jr.",
      RoleSurName: "Graphic Design",
      CategoryImg: "/star.png",
      number: "4.5",
    },
    {
      name: "Spicy Chicken Wings",
      firstName: "APPETIZER",
      Text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
      RoleName: "Alex Doe",
      RoleSurName: "Chef",
      CategoryImg: "/star.png",
      number: "4.2",
    },
    {
      name: "Beef Steak with Potatoes",
      firstName: "MAIN COURSE",
      Text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
      RoleName: "John Smith",
      RoleSurName: "Sous Chef",
      CategoryImg: "/star.png",
      number: "4.8",
    },
  ];

  const ReviewArr2 = [
    {
      id: 1,
      name: "James Kowalski",
      firstName: "Head Marketing",
      DateOfBirth: "24 June 2020",
      info: "We recently had dinner with friends at David CC. Great food, pleasant environment, personal attention throughout the evening. Thanks to the team! I’ll be back and will recommend it to others.",
      BtnReviewAboutOne: "Good Services",
      BtnReviewAboutTwo: "Good Places",
      BtnReviewAboutThree: "Excellent",
    },
    {
      name: "James Kowalski",
      firstName: "Head Marketing",
      DateOfBirth: "24 June 2020",
      info: "We recently had dinner with friends at David CC. Great food, pleasant environment, personal attention throughout the evening. Thanks to the team! I’ll be back and will recommend it to others.",
      BtnReviewAboutOne: "Good Services",
      BtnReviewAboutTwo: "Good Places",
      BtnReviewAboutThree: "Excellent",
    },
    {
      name: "James Kowalski",
      firstName: "Head Marketing",
      DateOfBirth: "24 June 2020",
      info: "We recently had dinner with friends at David CC. Great food, pleasant environment, personal attention throughout the evening. Thanks to the team! I’ll be back and will recommend it to others.",
      BtnReviewAboutOne: "Good Services",
      BtnReviewAboutTwo: "Good Places",
      BtnReviewAboutThree: "Excellent",
    },
    {
      name: "James Kowalski",
      firstName: "Head Marketing",
      DateOfBirth: "24 June 2020",
      info: "We recently had dinner with friends at David CC. Great food, pleasant environment, personal attention throughout the evening. Thanks to the team! I’ll be back and will recommend it to others.",
      BtnReviewAboutOne: "Good Services",
      BtnReviewAboutTwo: "Good Places",
      BtnReviewAboutThree: "Excellent",
    },
    {
      name: "James Kowalski",
      firstName: "Head Marketing",
      DateOfBirth: "24 June 2020",
      info: "We recently had dinner with friends at David CC. Great food, pleasant environment, personal attention throughout the evening. Thanks to the team! I’ll be back and will recommend it to others.",
      BtnReviewAboutOne: "Good Services",
      BtnReviewAboutTwo: "Good Places",
      BtnReviewAboutThree: "Excellent",
    },
  ];

  return (
    <div className={styles.reviewAgain}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",

          borderRadius: "10px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div>
            <input
              type="search"
              placeholder="Search here"
              style={{
                width: "1468px",
                height: "56px",
                maxWidth: "500px",
                height: "56px",
                borderRadius: "8px",
                paddingLeft: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
                backgroundColor: "#fff",
                marginTop: "30px",
                margin: "0px 60px",
              }}
            />
          </div>
          {[
            "/alarmClock.png",
            "/message.png",
            "/price.png",
            "/settings.png",
          ].map((src, idx) => (
            <div
              key={idx}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "10px",
                backgroundColor: "#2d9cdb26",
              }}
            >
              <Image
                className="imgTag"
                src={src}
                alt="Search"
                width={28}
                height={28}
              />
            </div>
          ))}
          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "16px",
                color: "#464255",
                marginTop: "-20px",
                cursor: "pointer",
              }}
            >
              Hello, Samantha
            </p>
          </div>
        </div>
      </div>
      <div className={styles.reviewManagement}>
        <div className={styles.reviewPart}>
          <h1 className={styles.reviewText4}>Reviews</h1>
          <p className={styles.reviewText5}>Dashboard / Customer Reviews</p>
        </div>
        <div className={styles.reviewPartRight}>
          <button>
            Filter Periode <br /> 17 April 2020 - 21 May 2020
          </button>
        </div>
      </div>

      <div className={styles.cardContainer}>
        {ReviewArr.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardCircle}></div>
            <div className={styles.content}>
              <div className={styles.headerLine}>
                <div className={styles.title}>{item.name}</div>
                <div className={styles.subtitle}>{item.firstName}</div>
              </div>
              <div className={styles.text}>{item.Text}</div>
              <div className={styles.footer}>
                <div className={styles.circleSm}></div>
                <div className={styles.info}>
                  <div className={styles.name}>{item.RoleName}</div>
                  <div className={styles.role}>{item.RoleSurName}</div>
                </div>
                <div className={styles.rating}>
                  <div className={styles.star}>
                    <img src={item.CategoryImg} alt="star" />
                  </div>
                  <span>{item.number}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.OtherReviewTable}>
        <div className={styles.OtherLeft}>
          <h1 className={styles.OtherReviewText}>Other Reviews</h1>
          <p className={styles.OtherReviewText2}>
            Here are some customer reviews about your restaurant.
          </p>

          {ReviewArr2.map((item, index) => (
            <div key={index} className={styles.ReviewAdded}>
              <div className={styles.ReviewBorderRadius}></div>
              <div className={styles.ReviewRightText}>
                <h1 className={styles.reviewText}>{item.name}</h1>
                <p className={styles.reviewText1}>
                  {item.firstName} . {item.DateOfBirth}
                </p>
                <p className={styles.reviewText2}>{item.info}</p>
              </div>
              <div className={styles.btn}>
                <button className={styles.btnReviewsBlue}>
                  {item.BtnReviewAboutTwo}
                </button>
                <button className={styles.btnReviewsGreen}>
                  {item.BtnReviewAboutThree}
                </button>
                <button className={styles.btnReviewsRed}>
                  {item.BtnReviewAboutOne}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.OtherRight}>
          <button className={styles.OtherBtn}>
            <img src="../latesst.png" alt="Latest" />
            Latest
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewsTable;

ReviewsTable.getLayout = (pageProps) => (
  <MainLayout>
    <ReviewsTable {...pageProps} />
  </MainLayout>
);
