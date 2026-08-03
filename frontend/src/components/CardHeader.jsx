import { useApp } from "../context/AppContext";

export default function CardHeader({ title, subtitle, right }) {
  const { c } = useApp();

  return (
    <div
      style={{
        marginBottom: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: c.text,
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div
            style={{
              fontSize: 11.5,
              color: c.textMuted,
              marginTop: 2,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {right && <div>{right}</div>}
    </div>
  );
}
