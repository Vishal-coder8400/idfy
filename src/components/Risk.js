import { useEffect, useRef, useState } from "react";
import '../index.css'

const MONTHS = [
  { month: "January", pct: "2.4%", highlight: false },
  { month: "February", pct: "2.81%", highlight: false },
  { month: "March", pct: "2.94%", highlight: false },
  { month: "April", pct: "3.17%", highlight: false },
  { month: "May", pct: "2.81%", highlight: false },
  { month: "June", pct: "2.75%", highlight: false },
  { month: "July", pct: "3.2%", highlight: false },
  { month: "August", pct: "3.17%", highlight: false },
];

const HighlightMONTHS = [
  { month: "September", pct: "3.36%", highlight: true },
  { month: "October", pct: "3.32%", highlight: true },
  { month: "November", pct: "3.48%", highlight: true },
  { month: "December", pct: "3.4%", highlight: true },
];

export default function StatsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Threshold adjusted to lower value so the first state stays visible longer
      // Triggers when the section's top is at 20% of the viewport (approaching middle/top)
      const threshold = window.innerHeight * 0.2;
      if (rect.top < threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const data = isScrolled ? {
    leftState: "Haryana",
    leftPct: "4.30%",
    centerText: "E-commerce",
    rightState: "Kerala",
    rightPct: "7.93%"
  } : {
    leftState: "Karnataka",
    leftPct: "6.91%",
    centerText: "Quick commerce",
    rightState: "Maharashtra",
    rightPct: "7.24%"
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderCard = (m, i, isHighlight) => {
    const imgSrc = isHighlight ? "/assets/highlight-card.png" : "/assets/calender.png";

    return (
      <div
        key={i}
        style={{
          position: "relative",
          opacity: 1,
          transform: "none",
          minWidth: 0,
          width: "100%",
        }}
      >
        <img
          src={imgSrc}
          alt=""
          style={{
            width: "100%",
            display: "block",
            pointerEvents: "none",
            aspectRatio: "248/266",
            maxWidth: "100%",
            height: "auto",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "28%",
            bottom: "6%",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "6%",
            pointerEvents: "none",
          }}
        >
          <div style={{
            color: "white",
            fontSize: isMobile ? "clamp(8px, 3vw, 14px)" : "30px",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 0.3,
            fontWeight: 500,
            textAlign: "center",
          }}>
            {m.month}
          </div>
          <div style={{
            color: "white",
            fontSize: isMobile ? "clamp(11px, 5vw, 24px)" : "30px",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1,
            textAlign: "center",
          }}>
            {m.pct}
          </div>
        </div>
      </div>
    );
  };

  /* ── Mobile hotspot block ── */
  const MobileHotspots = () => (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      gap: 0,
      opacity: 1,
      transform: "none",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/delivery.png" alt="" style={{ width: 60, height: 60, objectFit: "contain" }} />
          <span style={{ color: "white", fontSize: 22, fontWeight: 600, fontFamily: "Inter", lineHeight: 1.3 }}>
            Delivery<br />Partners
          </span>
        </div>
        <div style={{ color: "#e53e3e", fontSize: 22, fontWeight: 600, fontFamily: "Inter", marginTop: 12 }}>{data.leftState}</div>
        <div style={{ color: "white", fontSize: "48px", fontWeight: 700, fontFamily: "Inter", lineHeight: 1 }}>{data.leftPct}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, margin: "24px 0" }}>
        <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "10px solid #CE1010" }} />
        <span style={{ color: "white", fontSize: 17, fontWeight: 700, fontFamily: "Inter", letterSpacing: 0.3 }}>{data.centerText}</span>
        <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "10px solid #CE1010" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/truck_driver.png" alt="" style={{ width: 60, height: 60, objectFit: "contain" }} />
          <span style={{ color: "white", fontSize: 22, fontWeight: 600, fontFamily: "Inter", lineHeight: 1.3 }}>
            Truck<br />Drivers
          </span>
        </div>
        <div style={{ color: "#e53e3e", fontSize: 22, fontWeight: 600, fontFamily: "Inter", marginTop: 12 }}>{data.rightState}</div>
        <div style={{ color: "white", fontSize: "48px", fontWeight: 700, fontFamily: "Inter", lineHeight: 1 }}>{data.rightPct}</div>
      </div>
    </div>
  );

  // ── MOBILE: no sticky, no fixed height, just normal flow ──
  if (isMobile) {
    return (
      <div ref={sectionRef} style={{ background: "black", width: "100%" }}>
      <div
  style={{
    background: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",

    // ✅ equal spacing (top = bottom)
    padding: "60px 16px 60px",
  }}
>
          {/* Title 1 */}
          <h2
            className="text-[30px]"
            style={{
              fontFamily: "'Inter'",
              fontWeight: 700,
              color: "white",
              margin: "0 0 28px",
              textAlign: "center",
              lineHeight: 1.08,
              width: "100%",
              opacity: 1,
              transform: "none",
            }}
          >
            E-commerce & Quick Commerce Risk Hotspots
          </h2>

          <MobileHotspots />

          {/* Title 2 */}
          <h2
            className="text-[30px]"
            style={{
              fontFamily: "'Inter','Helvetica Neue',sans-serif",
              fontWeight: 700,
              color: "white",
              margin: "40px 0 8px",
              textAlign: "center",
              lineHeight: 1.1,
              opacity: 1,
              transform: "none",
              width: "100%",
            }}
          >
            Seasonal Risk Spikes
          </h2>

          <p style={{
            color: "white",
            margin: "0 0 24px",
            textAlign: "center",
            fontFamily: "Inter",
            opacity: 1,
            fontSize: "11px",
            lineHeight: 1.3,
            maxWidth: "100%",
          }}>
            A cyclical view of how risk rates spike and decline throughout the year.
          </p>

          {/* Month Grid — 4 columns on mobile too */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(4px, 2vw, 10px)",
            width: "100%",
            boxSizing: "border-box",
            padding: "0 4px",
          }}>
            {MONTHS.map((m, i) => renderCard(m, i, false))}
            {HighlightMONTHS.map((m, i) => renderCard(m, i + MONTHS.length, true))}
          </div>

          {/* Footer note */}
          <p style={{
            textAlign: "center",
            marginTop: 20,
            fontFamily: "Inter",
            color: "rgba(255,255,255,1)",
            fontWeight: 600,
            opacity: 1,
            width: "100%",
            padding: "0 8px",
            marginBottom: 0,
            fontSize: "13px",
            boxSizing: "border-box",
          }}>
            Risk rates remain consistent throughout the year for all segments,{" "}
            <span style={{ color: "#CE1010" }}>except for September to December.</span>
          </p>
        </div>
      </div>
    );
  }

  // ── DESKTOP ──
  return (
    <div ref={sectionRef} style={{ position: "relative" }}>
    <div
  style={{
    position: "relative",

    // ❌ was hidden → causing bottom crop
    overflow: "visible",

    background: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",

    // ✅ equal top & bottom spacing (safe for all devices)
    paddingTop: 100,
    paddingBottom: 100,

    // ✅ keep your responsive side spacing
    paddingLeft: "clamp(24px, 4vw, 64px)",
    paddingRight: "clamp(24px, 4vw, 64px)",
  }}
>
        {/* Title 1 */}
        <h2
          className="sm:text-[105px]"
          style={{
            fontFamily: "'Inter'",
            fontWeight: 700,
            color: "white",
            margin: "30px 0 28px",
            textAlign: "center",
            lineHeight: 1.08,
            maxWidth: "min(1400px, 100%)",
            opacity: 1,
            transform: "none",
         fontSize:
  window.innerWidth >= 1400 && window.innerWidth <= 2600
    ? "50px"
    : "clamp(60px, 7.5vw, 110px)",
          }}
        >
          E-commerce & Quick<br />Commerce Risk Hotspots
        </h2>

        {/* Hotspot Row — desktop */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "min(1300px, 100%)",
          marginBottom: 44,
          opacity: 1,
          transform: "none",
        }}>
          {/* Delivery Partners */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img src="/assets/delivery.png" alt="" style={{ width: 80, height: 80, objectFit: "contain" }} />
              <span style={{ color: "white", fontSize: "clamp(16px, 1.6vw, 24px)", fontWeight: 600, fontFamily: "Inter", lineHeight: 1.3 }}>
                Delivery<br />Partners
              </span>
            </div>
            <div style={{ color: "#e53e3e", fontSize: "clamp(16px, 1.6vw, 24px)", fontWeight: 600, fontFamily: "Inter", marginTop: 18 }}>{data.leftState}</div>
            <div style={{ color: "white", fontSize: "clamp(40px, 4.5vw, 65px)", fontWeight: 700, fontFamily: "Inter", lineHeight: 1 }}>{data.leftPct}</div>
          </div>

          {/* Center label */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
            <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "13px solid #CE1010", marginBottom: 8 }} />
            <span style={{ color: "white", fontSize: "clamp(14px, 1.4vw, 20px)", fontWeight: 700, fontFamily: "Inter", letterSpacing: 0.3 }}>{data.centerText}</span>
            <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "13px solid #CE1010", marginTop: 8 }} />
          </div>

          {/* Truck Drivers */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img src="/assets/truck_driver.png" alt="" style={{ width: 80, height: 80, objectFit: "contain" }} />
              <span style={{ color: "white", fontSize: "clamp(16px, 1.6vw, 24px)", fontWeight: 600, fontFamily: "Inter", lineHeight: 1.3 }}>
                Truck<br />Drivers
              </span>
            </div>
            <div style={{ color: "#e53e3e", fontSize: "clamp(16px, 1.6vw, 24px)", fontWeight: 600, fontFamily: "Inter", marginTop: 18 }}>{data.rightState}</div>
            <div style={{ color: "white", fontSize: "clamp(40px, 4.5vw, 65px)", fontWeight: 700, fontFamily: "Inter", lineHeight: 1 }}>{data.rightPct}</div>
          </div>
        </div>

        {/* Title 2 */}
        <h2
          className="pt-16 sm:text-[105px]"
          style={{
            fontFamily: "'Inter','Helvetica Neue',sans-serif",
            fontWeight: 700,
            color: "white",
            margin: "0 0 8px",
            textAlign: "center",
            lineHeight: "115%",
            opacity: 1,
            transform: "none",
            fontSize:
  window.innerWidth >= 1400 && window.innerWidth <= 2600
    ? "50px"
    : "clamp(60px, 8vw, 120px)",
            maxWidth: "min(1400px, 100%)",
          }}
        >
          Seasonal Risk Spikes
        </h2>

        <p style={{
          color: "white",
          margin: "0 0 24px",
          textAlign: "center",
          fontFamily: "Inter",
          opacity: 1,
        fontSize:
  window.innerWidth >= 1400 && window.innerWidth <= 2600
    ? "25px"
    : "clamp(16px, 2vw, 30px)",
          lineHeight: "150%",
          maxWidth: "min(900px, 100%)",
        }}>
          A cyclical view of how risk rates spike and decline throughout the year.
        </p>

        {/* Month Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "clamp(4px, 1.2vw, 24px)",
          width: "100%",
          maxWidth: "min(1100px, 100%)",
          boxSizing: "border-box",
        }}>
          {MONTHS.map((m, i) => renderCard(m, i, false))}
          {HighlightMONTHS.map((m, i) => renderCard(m, i + MONTHS.length, true))}
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: "center",
          marginTop: 28,
          fontFamily: "Inter",
          color: "rgba(255,255,255,1)",
          fontWeight: 600,
          opacity: 1,
          maxWidth: "min(1100px, 100%)",
          marginBottom: 40,
         fontSize:
  window.innerWidth >= 1400 && window.innerWidth <= 2600
    ? "25px"
    : "clamp(16px, 2vw, 30px)",
          boxSizing: "border-box",
        }}>
          Risk rates remain consistent throughout the year for all segments,<br />
          <span style={{ color: "#CE1010" }}>except for September to December.</span>
        </p>
      </div>
    </div>
  );
}