/* ============================================================
   GLASS CARD
   ============================================================ */
import React from "react";
import { useApp } from "../context/AppContext";
   function GlassCard({ children, style, className = "", hover = true }) {
  const { c } = useApp();
  return (
    <div
     className={`kgi-glass-card ${hover ? "kgi-card-hover" : ""} ${className}`}
      style={{
        background: c.surface,
        border: `1px solid ${c.border}`,
        borderRadius: 20,
        boxShadow: c.shadow,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
export default GlassCard;