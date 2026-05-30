/**
 * Open Graph share card — generated at the edge via next/og ImageResponse.
 * Navy "Midnight Draw" stage, white wordmark, gold NLA chip. 1200×630.
 *
 * Served at /opengraph-image and referenced by layout.tsx metadata. Uses
 * system fonts (no remote font fetch) for reliability at the edge — the
 * weights are heavy enough that the brand read survives without Montserrat.
 */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Wobedi Bi Lotto — lotto played for real.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(ellipse 85% 80% at 70% 32%, #04356a 0%, #001d3f 45%, #000919 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top row — eyebrow + Act 722 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.85)",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#3b9bff" }}>01</span>
            <span>Trusted NLA 5/90 lotto</span>
          </span>
          <span style={{ color: "#3b9bff" }}>Act 722</span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: 130,
              color: "#ffffff",
              lineHeight: 0.95,
              letterSpacing: -4,
            }}
          >
            Wobedi Bi.
          </span>
          <span
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 900,
              fontSize: 86,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: -2,
              lineHeight: 1,
              marginTop: 12,
            }}
          >
            Lotto played for real.
          </span>
        </div>

        {/* Bottom row — gold chip */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#0a6ed3",
              color: "#ffffff",
              fontFamily: "Arial, sans-serif",
              fontWeight: 800,
              fontSize: 26,
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: "14px 28px",
              borderRadius: 999,
            }}
          >
            18+ · NLA-licensed · 5/90
          </span>
          <span
            style={{
              fontFamily: "Arial, sans-serif",
              color: "rgba(255,255,255,0.6)",
              fontSize: 24,
            }}
          >
            wobedibilotto.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
