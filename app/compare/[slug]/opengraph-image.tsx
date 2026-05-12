import { ImageResponse } from "next/og";
import { getLogoUrl, getInitials } from "../../lib/logos";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Convert our Tailwind color classes to hex for use in OG images
function getColorHex(name: string): string {
  const colors = ["#7c3aed", "#2563eb", "#059669", "#ea580c", "#db2777", "#0d9488", "#dc2626"];
  return colors[name.charCodeAt(0) % colors.length];
}

function parseSlug(slug: string): { a: string; b: string } {
  const vsIndex = slug.indexOf("-vs-");
  if (vsIndex === -1) return { a: slug, b: "" };
  const toTitle = (s: string) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    a: toTitle(slug.slice(0, vsIndex)),
    b: toTitle(slug.slice(vsIndex + 4)),
  };
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { a, b } = parseSlug(slug);

  const logoA = getLogoUrl(a);
  const logoB = getLogoUrl(b);
  const colorA = getColorHex(a);
  const colorB = getColorHex(b);
  const initialsA = getInitials(a);
  const initialsB = getInitials(b);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle top glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 200,
            background: "radial-gradient(ellipse at top, rgba(124,58,237,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 52,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#7c3aed",
              display: "flex",
            }}
          />
          <span style={{ color: "#7c3aed", fontSize: 18, fontWeight: 600, letterSpacing: 6 }}>
            SIMILY.ORG
          </span>
        </div>

        {/* Main comparison row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            width: "100%",
          }}
        >
          {/* Item A */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              flex: 1,
            }}
          >
            {/* Logo A */}
            {logoA ? (
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 24,
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoA} width={76} height={76} style={{ objectFit: "contain" }} alt={a} />
              </div>
            ) : (
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 24,
                  background: colorA,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                <span style={{ color: "white", fontSize: 36, fontWeight: 800 }}>{initialsA}</span>
              </div>
            )}
            <span style={{ color: "white", fontSize: 34, fontWeight: 700, textAlign: "center" }}>
              {a}
            </span>
          </div>

          {/* VS badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                background: "rgba(124,58,237,0.15)",
                border: "2px solid rgba(124,58,237,0.4)",
                borderRadius: 999,
                padding: "14px 32px",
              }}
            >
              <span style={{ color: "#a78bfa", fontSize: 26, fontWeight: 800, letterSpacing: 2 }}>
                VS
              </span>
            </div>
          </div>

          {/* Item B */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              flex: 1,
            }}
          >
            {/* Logo B */}
            {logoB ? (
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 24,
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoB} width={76} height={76} style={{ objectFit: "contain" }} alt={b} />
              </div>
            ) : (
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 24,
                  background: colorB,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                <span style={{ color: "white", fontSize: 36, fontWeight: 800 }}>{initialsB}</span>
              </div>
            )}
            <span style={{ color: "white", fontSize: 34, fontWeight: 700, textAlign: "center" }}>
              {b}
            </span>
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 52,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: "#374151",
              display: "flex",
            }}
          />
          <span style={{ color: "#6b7280", fontSize: 18 }}>
            AI-powered comparison
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              background: "#374151",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
