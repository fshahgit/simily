import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        background: "#030712",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        position: "relative",
      },
      children: [
        // Logo row
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { fontSize: "56px", color: "#a78bfa" },
                  children: "⇄",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "56px",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-2px",
                  },
                  children: "Simily",
                },
              },
            ],
          },
        },
        // Headline
        {
          type: "div",
          props: {
            style: {
              fontSize: "60px",
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.15,
              maxWidth: "900px",
              marginBottom: "24px",
              letterSpacing: "-1.5px",
            },
            children: "Compare anything. Instantly.",
          },
        },
        // Subtext
        {
          type: "div",
          props: {
            style: {
              fontSize: "28px",
              color: "#9ca3af",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
              marginBottom: "48px",
            },
            children: "AI-powered comparisons for products, tools, ideas & more.",
          },
        },
        // Pills row
        {
          type: "div",
          props: {
            style: { display: "flex", gap: "16px" },
            children: ["ChatGPT vs Claude", "iPhone vs Samsung", "React vs Vue"].map(
              (label) => ({
                type: "div",
                props: {
                  style: {
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.4)",
                    borderRadius: "100px",
                    padding: "10px 24px",
                    color: "#c4b5fd",
                    fontSize: "20px",
                    fontWeight: 500,
                  },
                  children: label,
                },
              })
            ),
          },
        },
        // URL badge
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "36px",
              fontSize: "22px",
              color: "#4b5563",
              letterSpacing: "0.05em",
            },
            children: "simily.org",
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [],
  }
);

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
const png = resvg.render().asPng();

const outPath = path.join(__dirname, "../public/og.png");
fs.writeFileSync(outPath, png);
console.log("✅ OG image saved to public/og.png —", png.byteLength, "bytes");
