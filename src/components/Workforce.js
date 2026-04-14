import { useEffect, useRef, useState } from "react";
import { clamp, ease } from "./helpers";

const TIMELINE = [
  { year: "1999", desc: "The first online shopping platform gained traction.", title: "Medium", sub: "Courier services", tilt: -2.5 },
  { year: "2015", desc: "A social media platform introduced shoppable tags, where people could directly sell on the platform.", title: "Medium", sub: "Fleet operators", tilt: 1.8 },
  { year: "2017", desc: "E-commerce platforms offered same-day delivery services to compete on speed and reach. Premium members.", title: "Medium", sub: "Fleet operators + delivery drivers", tilt: -1.5 },
  { year: "2019", desc: "Food delivery platforms competed for speed promising delivery in 10–15 minutes from micro-fulfillment centers.", title: "Medium", sub: "Delivery Partners + Dark stores", tilt: 2.2 },
  { year: "2021", desc: "Quick commerce gained popularity for providing sub-15 minute delivery for premium products.", title: "Medium", sub: "Delivery Partners + Dark stores", tilt: -1.8 },
  { year: "2025", desc: "On-demand services (cleaning, cooking, etc) can be booked instantly.", title: "Medium", sub: "For everything instantly", tilt: 1.2 },
];

const MOBILE_CARD_W = 210;
const MOBILE_GAP = 12;
const TOTAL_MOBILE_RAIL_W =
  TIMELINE.length * MOBILE_CARD_W + (TIMELINE.length - 1) * MOBILE_GAP;

function TimelineCard({ item, entrance, isMobile, index, cardHeight, imgHeight }) {
  const cardWidth = isMobile ? MOBILE_CARD_W : 300;

  return (
    <div style={{
      opacity: entrance,
      transform: `scale(${0.88 + entrance * 0.12}) rotate(${item.tilt}deg)`,
      transformOrigin: "50% 0%",
      willChange: "transform, opacity",
      flexShrink: 0,
      transition: "opacity 0.35s ease-out, transform 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
    }}>
      <div style={{
        width: cardWidth,
        height: cardHeight,
        background: "#fff",
        borderRadius: 20,
        border: "2px solid #D7D7D7",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}>
        {/* Text content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: isMobile ? "10px 12px 6px" : "16px 20px 10px" }}>
            <div style={{
              display: "inline-block", color: "#CE1010",
              fontSize: isMobile ? 18 : 26,
              fontWeight: 800,
              fontFamily: "'Inter',sans-serif", letterSpacing: -0.5, marginBottom: 6,
            }}>{item.year}</div>
            <p style={{
              fontSize: isMobile ? 12 : 14,
              color: "#444", lineHeight: 1.55,
              fontFamily: "'Inter',sans-serif", margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>{item.desc}</p>
          </div>
          <div style={{ padding: isMobile ? "4px 12px 8px" : "8px 20px 10px" }}>
            <p style={{ fontSize: isMobile ? 13 : 18, fontWeight: 800, color: "#1a1a1a", fontFamily: "'Inter',sans-serif", marginBottom: 2, margin: 0 }}>{item.title}</p>
            <p style={{ fontSize: isMobile ? 11 : 13, color: "#888", fontFamily: "'Inter',sans-serif", lineHeight: 1.4, margin: 0 }}>{item.sub}</p>
          </div>
        </div>

        {/* Image */}
        <div style={{
          margin: isMobile ? "0 8px 8px" : "0 12px 12px",
          borderRadius: 10,
          overflow: "hidden",
          height: imgHeight,
          flexShrink: 0,
          background: "#f5f5f5",
        }}>
          <img
            src={`/assets/${index + 15}.png`}
            alt={item.year}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Workforce() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [isTablet, setIsTablet] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1024
  );
  const [vw, setVw] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth : 1440)
  );
  const [vh, setVh] = useState(
    () => (typeof window !== "undefined" ? window.innerHeight : 900)
  );

  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const railShift = ease(clamp(progress / 0.95, 0, 1));

  const cardEntrance = (i) => {
    if (i < 3) return 1;
    const start = i * 0.08;
    const end = start + 0.12;
    return ease(clamp((progress - start) / (end - start), 0, 1));
  };

  // ── Responsive sizing ──────────────────────────────────────────────────────
  // On short screens (MacBook Air 13", 900px tall) we need cards that fit
  // comfortably inside the viewport after the header text block.
  // Strategy: measure the available vertical space dynamically and derive
  // card + image heights from that budget instead of using fixed constants.

  const isShortDesktop = !isMobile && !isTablet && vh < 820;
  const isVeryShort   = !isMobile && !isTablet && vh < 700; // e.g. 13" with toolbar

  // Header block occupies roughly this many px (title + body + sources + padding)
  const headerBudget = isMobile ? 0 : isVeryShort ? 160 : isShortDesktop ? 190 : 260;

  // Bottom safe gap — ensures cards never touch the bottom of the viewport
  const bottomGap = isMobile ? 24 : isVeryShort ? 28 : isShortDesktop ? 36 : 48;

  // Available height for the card rail area
  const availableH = vh - headerBudget - bottomGap;

  // Card height: fill the available space but clamp to reasonable min/max
  const DESKTOP_CARD_H = isMobile
    ? 270
    : Math.min(Math.max(availableH, 260), 400); // 260–400px

  // Image height: proportional slice of the card
  const IMG_HEIGHT = isMobile ? 85 : Math.round(DESKTOP_CARD_H * 0.33);
  // ──────────────────────────────────────────────────────────────────────────

  // Mobile rail translation
  const mobileInitial = vw * 0.5;
  const mobileEnd = -(TOTAL_MOBILE_RAIL_W - vw + 48);
  const mobileTranslateX = mobileInitial * (1 - railShift) + mobileEnd * railShift;

  // Desktop rail translation
  const desktopCardW = 300;
  const desktopGap = isTablet ? 24 : 32;
  const totalDesktopW = TIMELINE.length * desktopCardW + (TIMELINE.length - 1) * desktopGap;
  const railPadLeft = vw * 0.06;
  const widthOfThreeCards = 3 * desktopCardW + 2 * desktopGap;
  const desktopStart = ((vw - railPadLeft - widthOfThreeCards) / vw) * 100;
  const desktopEnd = -((totalDesktopW - vw * 0.88) / vw) * 100;
  const desktopTranslateX = `calc(${desktopStart - railShift * (desktopStart - desktopEnd)}vw)`;

  // Scroll-height: enough for full rail travel
  const sectionH = isMobile
    ? vh + vh * 0.8
    : vh + vh * (TIMELINE.length * 0.35);

  const titleSize = isMobile
    ? "clamp(32px, 10vw, 52px)"
    : isTablet
    ? "clamp(52px, 8vw, 80px)"
    : isShortDesktop
    ? "clamp(48px, 6vw, 72px)"   // slightly smaller on short screens
    : "clamp(64px, 7vw, 105px)";

  const bodySize = isMobile
    ? "clamp(13px, 3.5vw, 16px)"
    : isTablet
    ? "clamp(16px, 2.5vw, 22px)"
    : isShortDesktop
    ? "clamp(14px, 1.6vw, 18px)"  // tighter on short screens
    : "clamp(18px, 1.8vw, 30px)";

  // Top/bottom padding for the sticky panel — reduced on short screens
  const stickyPaddingTop    = isMobile ? 48 : isVeryShort ? 20 : isShortDesktop ? 28 : 48;
  const stickyPaddingBottom = isMobile ? 0  : isVeryShort ? 20 : isShortDesktop ? 28 : 40;

  return (
    <div
      className="rounded-xl"
      ref={sectionRef}
      style={{ height: isMobile ? "" : sectionH, position: "relative", marginTop: 0 }}
    >
      <div
     style={{
  position: "sticky",
  top: isMobile ? 0 : 10,   // ✅ prevent top crop
  height: isMobile ? "auto" : "100vh",
  overflow: "visible",      // ✅ main fix
  display: "flex",
  flexDirection: "column",
  background: "#fff",
  justifyContent: "flex-start",
  boxSizing: "border-box",
  paddingTop: stickyPaddingTop,
  paddingBottom: stickyPaddingBottom,
}}
      >
        {/* Header text block */}
        <div
          className="px-4 sm:px-6 md:px-10 lg:px-16"
          style={{
            textAlign: "center",
            marginBottom: isMobile ? 20 : isVeryShort ? 12 : isShortDesktop ? 16 : 40,
            flexShrink: 0,
          }}
        >
          <h2 style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 700,
            color: "#CE1010",
            lineHeight: 1.05,
            margin: "0 0 10px",
            fontSize:
  vw >= 1400 && vw <= 2600
    ? "50px"
    : titleSize,    
          }}>
            The Workforce<br />Behind Every Order
          </h2>
          <p style={{
          fontSize:
  vw >= 1400 && vw <= 2600
    ? "25px"
    : bodySize,
            lineHeight: isMobile ? 1.5 : 1.4,
            color: "#343434",
            maxWidth: 900,
            margin: "0 auto 8px",
            fontWeight: 300,
            textAlign: "center",
          }}>
            India's doorstep economy operates at the intersection of logistics,
            technology, and human workforce. But that wasn't the case 15 years ago.
            Let's look at how the gig economy evolved with various business models
            over the last 3 decades.
          </p>
          <p style={{ fontSize: isMobile ? 11 : 13, color: "#aaa", fontStyle: "italic", margin: 0 }}>
            Sources:{" "}
            {["Kearney", "Young Urban Project", "Shiproket"].map((s) => (
              <a
                key={s}
                href="https://www.youngurbanproject.com/what-is-quick-commerce/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", cursor: "pointer", color: "#aaa", marginRight: 6 }}
                onMouseEnter={(e) => (e.target.style.color = "#CE1010")}
                onMouseLeave={(e) => (e.target.style.color = "#aaa")}
              >
                {s}
              </a>
            ))}
          </p>
        </div>

        {/* Card rail */}
        <div style={{
          width: "100%",
          overflow: "visible",
          // This bottom padding is the "safe gap" between cards and viewport bottom
          paddingBottom: bottomGap,
          flexShrink: 0,
        }}>
          <div style={{
            display: "flex",
            gap: isMobile ? MOBILE_GAP : isTablet ? 24 : 32,
            alignItems: "flex-start",
            paddingLeft: isMobile ? "4vw" : "6vw",
            paddingRight: isMobile ? "4vw" : "6vw",
            transform: isMobile
              ? `translateX(${mobileTranslateX}px)`
              : `translateX(${desktopTranslateX})`,
            willChange: "transform",
            transition: "transform 0.12s linear",
          }}>
            {TIMELINE.map((item, i) => (
              <TimelineCard
                key={item.year}
                item={item}
                entrance={cardEntrance(i)}
                isMobile={isMobile}
                index={i}
                cardHeight={DESKTOP_CARD_H}
                imgHeight={IMG_HEIGHT}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}