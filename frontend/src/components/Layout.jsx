import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
  const { collapsed, c } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className="kgi-main"
        style={{
          marginLeft: collapsed ? 78 : 248,
          minHeight: "100vh",
          background: c.bg,
          transition: "margin-left 0.25s ease",
        }}
      >
        <Navbar setMobileOpen={setMobileOpen} />

        <main>{children}</main>

        <BottomNav />
      </div>
    </>
  );
}
