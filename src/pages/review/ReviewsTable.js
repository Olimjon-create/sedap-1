import React from "react";
import styles from "../../styles/Reviews.module.css";
import Image from "next/image";

function ReviewsTable() {
  const ReviewArr = [
    {
      name: "Chicken Curry Special with Cucumber",
      firstName: "MAIN COURSE",
      Text: "Very delicious, flavorful and perfectly spiced dish!",
      RoleName: "Roberto Jr.",
      RoleSurName: "Graphic Design",
      CategoryImg: "/star.png",
      number: "4.5",
    },
    {
      name: "Spicy Chicken Wings",
      firstName: "APPETIZER",
      Text: "Crispy, spicy and juicy – perfect for a quick bite!",
      RoleName: "Alex Doe",
      RoleSurName: "Chef",
      CategoryImg: "/star.png",
      number: "4.2",
    },
    {
      name: "Beef Steak with Potatoes",
      firstName: "MAIN COURSE",
      Text: "Tender beef and creamy potatoes – excellent combo.",
      RoleName: "John Smith",
      RoleSurName: "Sous Chef",
      CategoryImg: "/star.png",
      number: "4.8",
    },
  ];

  const ReviewArr2 = [
    {
      name: "James Kowalski",
      firstName: "Head Marketing",
      DateOfBirth: "24 June 2020",
      info: "Great food, pleasant environment, and excellent service. Will recommend!",
      BtnReviewAboutOne: "Good Services",
      BtnReviewAboutTwo: "Good Places",
      BtnReviewAboutThree: "Excellent",
    },
    {
      name: "Anna West",
      firstName: "Food Blogger",
      DateOfBirth: "12 Feb 2021",
      info: "Loved the ambience and the desserts were fantastic!",
      BtnReviewAboutOne: "Tasty Food",
      BtnReviewAboutTwo: "Nice Atmosphere",
      BtnReviewAboutThree: "Quick Service",
    },
  ];

  return (
    <div className={styles.reviewAgain}>
      <div className={styles.header}>
        <input
          type="search"
          placeholder="Search here"
          className={styles.searchInput}
        />
        <div className={styles.actions}>
          {[
            "/alarmClock.png",
            "/message.png",
            "/price.png",
            "/settings.png",
          ].map((src, i) => (
            <div key={i} className={styles.iconBox}>
              <Image src={src} alt="icon" width={28} height={28} />
            </div>
          ))}
        </div>
        <p className={styles.greeting}>Hello, Samantha</p>
      </div>

      <div className={styles.reviewManagement}>
        <div>
          <h1 className={styles.title}>Reviews</h1>
          <p className={styles.subtitle}>Dashboard / Customer Reviews</p>
        </div>
        <button className={styles.filterButton}>
          Filter Period <br /> 17 April 2020 - 21 May 2020
        </button>
      </div>

      <div className={styles.cardContainer}>
        {ReviewArr.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardCircle}></div>
            <div className={styles.cardContent}>
              <h3>{item.name}</h3>
              <span className={styles.category}>{item.firstName}</span>
              <p className={styles.cardText}>{item.Text}</p>
              <div className={styles.cardFooter}>
                <div>
                  <strong>{item.RoleName}</strong> <br />
                  <small>{item.RoleSurName}</small>
                </div>
                <div className={styles.rating}>
                  <Image
                    src={item.CategoryImg}
                    alt="rating"
                    width={18}
                    height={18}
                  />
                  <span>{item.number}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.otherReviews}>
        <h2>Other Reviews</h2>
        <p>Here are some customer reviews about your restaurant.</p>
        {ReviewArr2.map((item, index) => (
          <div key={index} className={styles.reviewItem}>
            <div className={styles.avatar}></div>
            <div className={styles.reviewContent}>
              <h4>{item.name}</h4>
              <p className={styles.meta}>
                {item.firstName} • {item.DateOfBirth}
              </p>
              <p>{item.info}</p>
              <div className={styles.tags}>
                <span className={styles.tagBlue}>{item.BtnReviewAboutTwo}</span>
                <span className={styles.tagGreen}>
                  {item.BtnReviewAboutThree}
                </span>
                <span className={styles.tagRed}>{item.BtnReviewAboutOne}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsTable;
