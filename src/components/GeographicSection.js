import { useEffect, useRef, useState } from "react";

const SEGMENTS = [
  { title: "Truck Drivers", mapSrc: "/assets/truck driver.svg" },
  { title: "Dark Store Workers", mapSrc: "/assets/dark store .svg" },
  { title: "Delivery Partners", mapSrc: "/assets/delivery partners .svg" },
];

const DEFAULT_MAP = "/assets/india.png";

export default function GeographicSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [vw, setVw] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440);
  const [vh, setVh] = useState(() => typeof window !== "undefined" ? window.innerHeight : 900);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const isTablet = vw >= 768 && vw < 1024;
  const isShortDesktop = !isMobile && !isTablet && vh < 780;

  const activeMap = openIndex === null ? DEFAULT_MAP : SEGMENTS[openIndex].mapSrc;

  const handleSegmentClick = (i) => {
    setOpenIndex(prev => prev === i ? null : i);
  };

  // Top segment buttons (horizontal row) — matches image layout
  const SegmentButtons = () =>
    SEGMENTS.map((item, i) => {
      const isOpen = openIndex === i;
      return (
        <button
          key={i}
          onClick={() => handleSegmentClick(i)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 5 : 8,
            cursor: "pointer",
            background: isOpen ? "#e53e3e" : "transparent",
            border: isOpen ? "none" : "none",
            borderRadius: 6,
            padding: isMobile ? "4px 8px" : "6px 14px",
            color: "white",
            fontSize: isMobile ? 10 : 18,
            fontWeight: 700,
            fontFamily: "'Inter',sans-serif",
            userSelect: "none",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
        >
          <span style={{
            display: "inline-block",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            fontSize: isMobile ? 8 : 13,
            color: isOpen ? "white" : "#e53e3e",
          }}>▶</span>
          {item.title}
        </button>
      );
    });

  return (
    <div ref={sectionRef} style={{ position: "relative" }}>
   <div
  style={{
    position: "relative",

    // ❌ REMOVE fixed heights completely
    // height: isMobile ? "auto" : isShortDesktop ? "135vh" : "100vh",

    // ✅ ALWAYS natural height
    height: "auto",

    // ❌ REMOVE hidden (causing crop)
    // overflow: "hidden",

    // ✅ allow full content
    overflow: "visible",

    background: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    // ✅ UNIVERSAL RESPONSIVE SPACING (Figma-like)
    paddingTop: isMobile ? 60 : isTablet ? 80 : isShortDesktop ? 90 : 110,
    paddingBottom: isMobile ? 60 : isTablet ? 80 : isShortDesktop ? 90 : 110,
    paddingLeft: isMobile ? 20 : 56,
    paddingRight: isMobile ? 20 : 56,
  }}
>
        <div style={{ position: "absolute", top: 0, left: -450, zIndex: 0 }}>
          <img src="/assets/Ellipse.png" alt="ellipse"
            style={{ width: "900px", height: "900px", opacity: 1 }} />
        </div>

        {/* Title */}
        <div style={{
          textAlign: "center",
          marginBottom: 8,
          opacity: 1,
          position: "relative",
          zIndex: 1,
        }}>
        <h2
  style={{
    fontFamily: "Inter",
    fontWeight: 700,
    color: "white",
    margin: 0,
    lineHeight: 1.05,

    // ✅ responsive font (prevents breaking)
    fontSize:
  isMobile
    ? "22px"
    : vw >= 1400 && vw <= 2600
    ? "50px"
    : "clamp(40px, 5vw, 80px)",

    // ❌ REMOVE maxWidth restriction
    // maxWidth: isMobile ? "100%" : "900px",

    // ✅ force single line
    whiteSpace: "nowrap",

    // ✅ prevent overflow breaking layout
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}
>
  Geographic Risk Concentration
</h2>
          <p style={{
            color: "white",
            margin: "12px 0 0",
            fontFamily: "'Inter',sans-serif",
            /* Changed from 30px → 26px */
           fontSize:
  isMobile
    ? "11px"
    : vw >= 1400 && vw <= 2600
    ? "25px"
    : "26px",
          }}>
            A breakdown of states with the highest risk rates across India.
          </p>

          {/* Segment buttons — now at the top, horizontal row */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? 6 : 16,
            marginTop: isMobile ? 10 : 18,
          }}>
            <SegmentButtons />
          </div>
        </div>

        {/* Body */}
        <div
          className="flex flex-col-reverse lg:grid lg:grid-cols-[370px_613px] justify-center gap-12 md:gap-20 w-full max-w-[1400px] mt-10"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Left panel */}
          <div style={{
            opacity: 1,
            transform: "none",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingTop: 8,
          }}>
            {/* Desktop-only paragraphs */}
            <p className="hidden lg:block" style={{
              color: "white",
              /* Changed from 30px → 26px */
              fontSize:
  vw >= 1400 && vw <= 2600
    ? "25px"
    : 26,
              lineHeight: "115%",
              fontFamily: "'Inter',sans-serif",
              margin: 0,
            }}>
              Kerala records the highest risk rate in the country, with
              Maharashtra close behind, making them two of the highest risk
              concentration states across segments.
            </p>
            <p className="hidden lg:block" style={{
              color: "white",
              /* Changed from 30px → 26px */
             fontSize:
  vw >= 1400 && vw <= 2600
    ? "25px"
    : 26,
              lineHeight: "115%",
              fontFamily: "'Inter',sans-serif",
              margin: 0,
            }}>
              Another contributing factor behind this surge could be stronger
              crime reporting mechanisms in southern and western states. For
              example, in Kerala, many challans are automatically generated
              through AI-enabled monitoring cameras at traffic junctions.
            </p>

            {/* Mobile-only paragraphs */}
            <p className="block lg:hidden" style={{
              color: "white", fontSize: 11, lineHeight: 1.7,
              fontFamily: "'Inter',sans-serif", margin: 0, textAlign: "center",
            }}>
              Kerala records the highest risk rate in the country, with
              Maharashtra close behind, making them two of the highest risk
              concentration states across segments.
            </p>
            <p className="block lg:hidden" style={{
              color: "white", fontSize: 11, lineHeight: 1.7,
              fontFamily: "'Inter',sans-serif", margin: 0, textAlign: "center",
            }}>
              Another contributing factor behind this surge could be stronger
              crime reporting mechanisms in southern and western states. For
              example, in Kerala, many challans are automatically generated
              through AI-enabled monitoring cameras at traffic junctions.
            </p>
          </div>

          {/* Map — fixed size: 713.02 × 662.79px */}
          <div style={{
            position: "relative",
            opacity: 1,
            transform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? "100%" : "613.02px",
            height: isMobile ? "auto" : "562.79px",
            flexShrink: 0,
          }}>
            <img
              key={activeMap}
              src={activeMap}
              alt={openIndex === null ? "India map" : SEGMENTS[openIndex].title + " map"}
              style={{
                width: isMobile ? "100%" : "613.02px",
                height: isMobile ? "auto" : "562.79px",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                filter: "brightness(0.9)",
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}