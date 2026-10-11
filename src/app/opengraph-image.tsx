import { ImageResponse } from "next/og";

export const alt = "Rakib Hussain — Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(124, 255, 103, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(82, 39, 255, 0.2) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(180, 151, 207, 0.1) 0%, transparent 50%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "22px",
              }}
            >
              RH
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "#ffffff",
              }}
            >
              Rakib Hussain
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "rgba(34, 197, 94, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: "#4ade80",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                backgroundColor: "#22c55e",
              }}
            />
            Available for Opportunities
          </div>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              margin: 0,
              color: "#ffffff",
            }}
          >
            Full-Stack Developer & Software Craftsman
          </h1>
          <p
            style={{
              fontSize: "26px",
              color: "#a1a1aa",
              lineHeight: 1.4,
              margin: 0,
              fontWeight: 400,
            }}
          >
            Building high-performance web applications, resilient backend architectures, and fluid user experiences.
          </p>
        </div>

        {/* Bottom Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            {["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"].map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "6px 14px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#e4e4e7",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#71717a",
            }}
          >
            iamrakibhussain.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
