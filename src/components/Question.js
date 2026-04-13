import { useEffect, useRef, useState } from "react";

export default function Question() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [vw, setVw] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440);
  const [vh, setVh] = useState(() => typeof window !== "undefined" ? window.innerHeight : 900);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isTablet = vw >= 768 && vw < 1024;
  const isShortDesktop = !isMobile && !isTablet && vh < 780;

  const questions = [
    { img: "/assets/question1.png", text: "Which segments are the most risk-prone?" },
    { img: "/assets/question2.png", text: "Where are the risk hotspots across the country?" },
    { img: "/assets/question3.png", text: "what correlations exist between risk rates and other factors?" },
  ];

  const people = [
    { label: "Truck drivers", riskRate: "4.75%", meanAge: "30.90", img: "/assets/people1.png", style: { bottom: 8, right: -20, rotate: "-6deg" } },
    { label: "Dark Store Workers", riskRate: "2.36%", meanAge: "24.34", img: "/assets/people2.png", style: { bottom: -13, right: 7, rotate: "10deg" } },
    { label: "Delivery Partners", riskRate: "3.04%", meanAge: "27.94", img: "/assets/people3.png", style: { bottom: 13, right: -18, rotate: "-7deg" } },
  ];

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "relative",
        height: isMobile ? "auto" : isShortDesktop ? "157vh" : "100vh",
        overflow: "hidden",
        background: "black",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: isMobile ? "0px 20px 48px" : "48px 64px",
        gap: isMobile ? 24 : 40,
      }}>
        {!isMobile && (
          <div style={{
            position: "absolute",
            top: 0, right: -430,
            zIndex: 0, pointerEvents: "none",
          }}>
            <img src="/assets/Ellipse.png" alt="ellipse"
              style={{ width: "900px", height: "900px", opacity: 1 }} />
          </div>
        )}

        {/* ── Section 1: Questions ── */}
        <div style={{ width: "100%", maxWidth: 1300 }}>
          <h2 className="sm:text-[70px] text-[30px]" style={{
            fontFamily: "'Inter','Helvetica Neue',sans-serif",
            fontWeight: 700, color: "white",
            margin: "0 0 32px", textAlign: "center", lineHeight: isMobile ? "36px" : "60px",
            opacity: 1, transform: "none",
          }}>
            This section answers questions like
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 24 : 20,
            width: "100%",
          }}>
            {questions.map((q, i) => (
              <div key={i} style={{
                backgroundImage: "linear-gradient(#1d1d1d,#212121)",
                border: "1px solid white",
                borderRadius: 16, padding: isMobile ? "6px 10px" : "18px 20px",
                display: "flex", alignItems: "center", gap: 20,
                minHeight: isMobile ? 80 : 110,
                opacity: 1,
                transform: "none",
              }}>
                <div style={{
                  width: 78, height: 78, flexShrink: 0,
                  borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <img src={q.img} alt="" style={{ width: 150, height: 100, objectFit: "contain" }} />
                </div>
                <p style={{
                  color: "white", fontSize: isMobile ? "14px" : "clamp(13px,1.05vw,17px)",
                  fontWeight: 500, margin: 0, lineHeight: 1.5,
                  fontFamily: "'Inter',sans-serif",
                }}>{q.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: "100%", maxWidth: 1300,
          height: 1, background: "rgba(255,255,255,0.08)",
          opacity: 1,
        }} />

        {/* ── Section 2: People ── */}
        <div style={{ width: "100%", maxWidth: 1100 }}>
          <h2
            className="bg-gradient-to-r from-[#cdcdcd] to-white bg-clip-text text-transparent"
            style={{
              fontFamily: "'Inter','Helvetica Neue',sans-serif",
              fontWeight: 700,
              margin: "0 0 32px",
              textAlign: "center",
              lineHeight: 1.05,
              opacity: 1,
              transform: "none",
              fontSize: isMobile ? 50 : 110,
            }}
          >
            People in focus
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 24 : 20,
            width: "100%",
          }}>
            {people.map((p, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                padding: isMobile ? "20px 20px 0" : "28px 28px 0",
                display: "flex", flexDirection: "column",
                position: "relative", overflow: "hidden",
                minHeight: isMobile ? 200 : 280,
                opacity: 1,
                transform: "none",
              }}>
                <div style={{
                  color: "#CE1010", fontSize: "18px",
                  fontWeight: 600, marginBottom: 16,
                  fontFamily: "'Inter',sans-serif",
                }}>{p.label}</div>

                <div style={{
                  color: "white", marginTop: "12px",
                  fontSize: isMobile ? "36px" : "clamp(26px,2.8vw,42px)",
                  fontWeight: 700, lineHeight: 1, fontFamily: "'Inter',sans-serif",
                }}>{p.riskRate}</div>
                <div style={{ color: "white", fontSize: 18, marginTop: 6, marginBottom: 20 }}>
                  Risk Rate
                </div>

                <div style={{ color: "white", fontSize: 18, marginBottom: 19, marginTop: 5 }}>
                  Mean Age
                </div>
                <div style={{
                  color: "white",
                  fontSize: isMobile ? "36px" : "clamp(26px,2.8vw,42px)",
                  fontWeight: 700, lineHeight: 1, fontFamily: "'Inter',sans-serif",
                }}>{p.meanAge}</div>
                <div style={{ color: "white", fontSize: 18, marginTop: 8, marginBottom: 20 }}>
                  years
                </div>

                <img
                  src={p.img}
                  alt={p.label}
                  style={{
                    position: "absolute",
                    bottom: p.style?.bottom || -10,
                    right: p.style?.right || -10,
                    width: 145,
                    height: 145,
                    objectFit: "contain",
                    objectPosition: "bottom right",
                    transform: `rotate(${p.style?.rotate || "10deg"})`,
                    transformOrigin: "bottom right",
                    opacity: 0.88,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}