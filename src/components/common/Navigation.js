import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaStar,
  FaUtensils,
  FaThLarge,
  FaListAlt,
  FaCalendarAlt,
  FaComments,
  FaWallet,
} from "react-icons/fa";
import Image from "next/image";

function Navigation() {
  const router = useRouter();

  const links = [
    { id: 1, linkName: "Dashboard", icon: FaTachometerAlt, href: "/dashboard" },
    { id: 2, linkName: "Order List", icon: FaClipboardList, href: "/orders" },
    { id: 3, linkName: "Customers", icon: FaUsers, href: "/customers" },
    { id: 4, linkName: "Analytics", icon: FaChartBar, href: "/analiytics" },
    { id: 5, linkName: "Review", icon: FaStar, href: "/review" },
    { id: 6, linkName: "Foods", icon: FaUtensils, href: "/foods" },
    { id: 7, linkName: "Categories", icon: FaThLarge, href: "/categories" },
    { id: 8, linkName: "Types", icon: FaListAlt, href: "/types" },
    { id: 9, linkName: "Calendar", icon: FaCalendarAlt, href: "/calendar" },
    { id: 10, linkName: "Chat", icon: FaComments, href: "/chat" },
    { id: 11, linkName: "Wallet", icon: FaWallet, href: "/wallet" },
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
          fontFamily: "Barlow, sans-serif",
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
            alt="Sedap Logo"
            width={167}
            height={49}
            style={{ backgroundColor: "unset" }}
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
          <div style={{ width: "140px", backgroundColor: "unset" }}>
            <p
              style={{
                fontSize: "12px",
                color: "white",
                backgroundColor: "unset",
              }}
            >
              Please, organize your menus through button below!
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
              + Add Menus
            </button>
          </div>
          <Image
            src="/illustration.png"
            width={77}
            height={91}
            alt="Illustration"
          />
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
              color: "#515151",
              fontSize: "12px",
              marginBottom: "5px",
              backgroundColor: "unset",
            }}
          >
            Sedap Restaurant Admin Dashboard
          </p>
          <p
            style={{
              color: "#969ba0",
              fontSize: "12px",
              backgroundColor: "unset",
            }}
          >
            © 2020 All Rights Reserved
          </p>
          <p
            style={{
              color: "#969ba0",
              fontSize: "14px",
              marginTop: "15px",
              backgroundColor: "unset",
            }}
          >
            Made with ♥ by Peterdraw
          </p>
        </div>
      </aside>
    </div>
  );
}

function CustomLink({ linkName, icon: Icon, href, active }) {
  return (
    <div style={{ position: "relative", width: "250px", margin: "0 auto" }}>
      {active && (
        <div
          style={{
            position: "absolute",
            left: "-20%",
            width: "8px",
            height: "100%",
            backgroundColor: "#00b074",
            borderRadius: "4px",
          }}
        />
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
