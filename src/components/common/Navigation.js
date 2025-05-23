import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import {
  IoHomeOutline,
  IoReceiptOutline,
  IoPeopleOutline,
  IoBarChartOutline,
  IoChatboxEllipsesOutline,
  IoFastFoodOutline,
  IoRestaurantOutline,
  IoPersonCircleOutline,
  IoCalendarOutline,
  IoChatbubbleOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { FaListUl } from "react-icons/fa";

function Navigation() {
  const asideStyle = {
    width: "349px",
    height: "900px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    paddingTop: "58px",
  };

  const asideHeaderStyle = {
    marginBottom: "58px",
    textAlign: "center",
    backgroundColor: "transparent",
  };

  const subtitleStyle = {
    color: "#b9bbbd",
    fontSize: "18px",
    fontWeight: 400,
  };

  const buttonsMenuStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    padding: "0 20px",
  };

  const links = [
    { id: 1, linkName: "Dashboard", linkImg: <IoHomeOutline />, href: "/" },
    {
      id: 2,
      linkName: "Order List",
      linkImg: <FaListUl />,
      href: "/OrderList",
    },
    {
      id: 3,
      linkName: "Order Detail",
      linkImg: <IoReceiptOutline />,
      href: "/OrderTop",
    },
    {
      id: 4,
      linkName: "Customers",
      linkImg: <IoPeopleOutline />,
      href: "/customers",
    },
    {
      id: 5,
      linkName: "Analytics",
      linkImg: <IoBarChartOutline />,
      href: "/analis",
    },
    {
      id: 6,
      linkName: "Review",
      linkImg: <IoChatboxEllipsesOutline />,
      href: "/ReviewsTop",
    },
    {
      id: 7,
      linkName: "Foods",
      linkImg: <IoFastFoodOutline />,
      href: "/foods",
    },
    {
      id: 8,
      linkName: "Food Detail",
      linkImg: <IoRestaurantOutline />,
      href: "/foodDetail",
    },
    {
      id: 9,
      linkName: "Customer Detail",
      linkImg: <IoPersonCircleOutline />,
      href: "/CustomerTop",
    },
    {
      id: 10,
      linkName: "Calendar",
      linkImg: <IoCalendarOutline />,
      href: "/OrderDetail",
    },
    {
      id: 11,
      linkName: "Chat",
      linkImg: <IoChatbubbleOutline />,
      href: "/chat",
    },
    {
      id: 12,
      linkName: "Wallet",
      linkImg: <IoWalletOutline />,
      href: "/wallet",
    },
  ];

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;700&display=swap"
        />
      </Head>
      <aside style={asideStyle}>
        <div style={asideHeaderStyle}>
          <Image
            src="/Sedap.png"
            alt="Sedap Logo"
            width={167}
            height={49}
            style={{ backgroundColor: "transparent" }}
          />
          <p style={subtitleStyle}>Modern Admin Dashboard</p>
        </div>
        <div style={buttonsMenuStyle}>
          {links.map(({ id, href, linkName, linkImg }) => (
            <NavLink
              key={id}
              linkName={linkName}
              linkImg={linkImg}
              href={href}
            />
          ))}
        </div>
      </aside>
    </>
  );
}

function NavLink({ linkName, linkImg, href }) {
  const router = useRouter();
  const isActive = router.asPath === href;
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    textDecoration: "none",
    color: "#000",
    width: "100%",
    height: "54px",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    fontWeight: 500,
    fontSize: "16px",
    paddingLeft: "30px",
    position: "relative",
    backgroundColor: isActive
      ? "rgba(255, 255, 255, 0.3)"
      : isHovered
      ? "#00B074"
      : "transparent",
    transition: "0.3s ease",
    cursor: isHovered ? "pointer" : "default",
  };

  const iconStyle = {
    marginRight: "20px",
    fontSize: "20px",
  };

  const textStyle = {
    flex: 1,
  };

  const activeBefore = {
    content: '""',
    display: "block",
    width: "8px",
    height: "100%",
    backgroundColor: "#ffffff",
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: "4px",
  };

  return (
    <Link href={href} passHref legacyBehavior>
      <a
        style={baseStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isActive && <span style={activeBefore}></span>}
        <span style={iconStyle}>{linkImg}</span>
        <span style={textStyle}>{linkName}</span>
      </a>
    </Link>
  );
}

export default Navigation;
