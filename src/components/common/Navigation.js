import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  CiBank,
  CiCircleList,
  CiChat1,
  CiWallet,
  CiCalendar,
  CiForkAndKnife,
  CiAlignBottom,
  CiViewList,
  CiUser,
  CiStar,
  CiCircleMinus,
} from "react-icons/ci";
import Image from "next/image";

function Navigation(props) {
  const router = useRouter();

  const links = [
    {
      id: 1,
      linkName: "Dashboard",
      icon: CiBank,
      href: "/dashboard",
    },
    {
      id: 2,
      linkName: "Order List",
      icon: CiViewList,
      href: "/orders",
    },
    {
      id: 4,
      linkName: "Customers",
      icon: CiUser,
      href: "/customers",
    },
    {
      id: 5,
      linkName: "Analytics",
      icon: CiAlignBottom,
      href: "/analis",
    },
    {
      id: 6,
      linkName: "Review",
      icon: CiStar,
      href: "/review",
    },
    {
      id: 7,
      linkName: "Foods",
      icon: CiForkAndKnife,
      href: "/foods",
    },
    {
      id: 7,
      linkName: "Categories",
      icon: CiCircleList,
      href: "/categories",
    },
    {
      id: 7,
      linkName: "Types",
      icon: CiCircleList,
      href: "/types",
    },
    {
      id: 10,
      linkName: "Calendar",
      icon: CiCalendar,
      href: "/calendar",
    },
    {
      id: 11,
      linkName: "Chat",
      icon: CiChat1,
      href: "/chat",
    },
    {
      id: 12,
      linkName: "Wallet",
      icon: CiWallet,
      href: "/wallet",
    },
  ];

  return (
    <div>
      <Head />
      <aside
        style={{
          width: "345px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Barlow sans-serif",
        }}
      >
        <div
          style={{
            marginTop: "58px",
            marginBottom: "58px",
            backgroundColor: "unset",
          }}
        >
          <Image
            src="/Sedap.png"
            alt=""
            style={{ backgroundColor: "unset" }}
            width={167}
            height={49}
          />
          <p
            style={{
              color: "#B9BBBD",
              fontSize: "18px",
              backgroundColor: "unset",
            }}
          >
            Modern Admin Dashboard
          </p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "unset",
            position: "relative",
          }}
        >
          {links.map(({ id, href, linkName, icon }) => {
            const active = router.pathname.startsWith(href);
            return (
              <CustomLink
                key={id}
                linkName={linkName}
                icon={icon}
                href={href}
                active={active}
              />
            );
          })}
        </div>
        <div
          style={{
            width: "260px",
            marginTop: "89px",
            display: "flex",
            padding: "20px",
            backgroundColor: "#00b074",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: "140px",
              backgroundColor: "unset",
            }}
          >
            <p
              style={{
                width: "140px",
                fontSize: "12px",
                color: "white",
                backgroundColor: "unset",
              }}
            >
              Please, organize your menus through button bellow!
            </p>
            <button
              style={{
                width: "116px",
                height: "37px",
                color: "#464255",
                fontSize: "15px",
                backgroundColor: "#f2f5f3",
                border: "none",
                borderRadius: "5px",
                marginTop: "8px",
                cursor: "pointer",
              }}
            >
              +Add Menus
            </button>
          </div>
          <Image src="/illustration.png" width={77} height={91} alt="grand" />
        </div>
        <div
          style={{
            width: "245px",
            backgroundColor: "unset",
            marginTop: "59px",
            marginBottom: "43px",
          }}
        >
          <p
            style={{
              backgroundColor: "unset",
              color: "#515151",
              fontSize: "12px",
              marginBottom: "5px",
            }}
          >
            Sedap Restaurant Admin Dashboard
          </p>
          <p
            style={{
              backgroundColor: "unset",
              color: "#969ba0",
              fontSize: "12px",
              fontWeight: "400px",
            }}
          >
            © 2020 All Rights Reserved
          </p>
          <p
            style={{
              backgroundColor: "unset",
              color: "#969ba0",
              fontSize: "14px",
              marginTop: "15px",
            }}
          >
            Made with ♥ by Peterdraw
          </p>
        </div>
      </aside>
      {/* <Section/> */}
    </div>
  );
}

function CustomLink(props) {
  const { linkName, icon: Icon, href, active } = props;
  return (
    <div style={{ position: "relative", width: "250px", margin: "0 auto" }}>
      {active && (
        <div
          style={{
            content: "''",
            position: "absolute",
            left: "-20%",
            width: "8px",
            height: "100%",
            backgroundColor: "#00b074",
            borderRadius: "4px",
          }}
        ></div>
      )}
      <Link
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          background: active ? "#00B07426" : "",
          color: active ? "#177556" : "",
          padding: "12px 20px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: 500,
          position: "relative",
        }}
      >
        <Icon
          style={{
            fontSize: "25px",
            color: active ? "#00B074" : "#B9BBBD",
          }}
        />
        {linkName}
      </Link>
    </div>
  );
}

export default Navigation;
