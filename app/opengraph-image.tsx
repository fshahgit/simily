import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Simily — Compare Anything with AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#030712",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          }}
        />
        {/* Purple glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontSize: 52,
              color: "#a78bfa",
            }}
          >
            ⇄
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
            }}
          >
            Simily
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 900,
            marginBottom: 24,
            letterSpacing: "-1.5px",
          }}
        >
          Compare anything.{" "}
          <span style={{ color: "#a78bfa" }}>Instantly.</span>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: 26,
            color: "#9ca3af",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          AI-powered comparisons for products, tools, ideas & more.
        </div>

        {/* Example comparison pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            "ChatGPT vs Claude",
            "iPhone vs Samsung",
            "React vs Vue",
            "Keto vs IF",
          ].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.3)",
                borderRadius: 100,
                padding: "10px 22px",
                color: "#c4b5fd",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL badge */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 20,
            color: "#4b5563",
            letterSpacing: "0.05em",
          }}
        >
          simily.org
        </div>
      </div>
    ),
    { ...size }
  );
}
