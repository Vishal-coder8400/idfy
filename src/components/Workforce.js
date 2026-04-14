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
// FIX 1: Define fixed card heights so every card is identical regardless of content
const MOBILE_CARD_H = 270;
const DESKTOP_CARD_H = 380;
const MOBILE_GAP = 12;
const TOTAL_MOBILE_RAIL_W =
  TIMELINE.length * MOBILE_CARD_W + (TIMELINE.length - 1) * MOBILE_GAP;

function TimelineCard({ item, entrance, isMobile, index }) {
  const cardWidth = isMobile ? MOBILE_CARD_W : 300;
  // FIX 1 (cont.): Apply fixed heights to card and image so all cards are uniform
  const cardHeight = isMobile ? MOBILE_CARD_H : DESKTOP_CARD_H;
  const imgHeight = isMobile ? 85 : 130;

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
        // FIX 1 (cont.): Enforce a fixed height on the card box itself
        height: cardHeight,
        background: "#fff",
        borderRadius: 20,
        border: "2px solid #D7D7D7",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        // FIX 1 (cont.): Distribute space so text area + image fill the fixed height evenly
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}>
        {/* Text content – flex:1 so it expands to fill available space */}
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
              // FIX 1 (cont.): Clamp text to 3 lines so variable-length copy never stretches the card
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

        {/* Image – fixed height, never grows or shrinks */}
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

  // FIX 2: Spread card entrance triggers more evenly so each card is fully
  // revealed before the rail starts moving to the next one.
  const cardEntrance = (i) => {
    if (i < 3) return 1;
    // Each card gets a 0.12-wide window (was 0.14) spaced 0.08 apart (was 0.06)
    const start = i * 0.08;
    const end = start + 0.12;
    return ease(clamp((progress - start) / (end - start), 0, 1));
  };

  // FIX 3: Mobile – start fully off-screen right, end fully off-screen left
  // with enough margin so the last card is never clipped.
  const mobileInitial = vw * 0.5;                           // begin further right for a clean first-card reveal
  const mobileEnd = -(TOTAL_MOBILE_RAIL_W - vw + 48);  // extra 48px padding so last card clears the edge
  const mobileTranslateX = mobileInitial * (1 - railShift) + mobileEnd * railShift;

  // FIX 3 (cont.): Desktop – wider travel range so the rightmost card fully
  // enters the viewport before progress reaches 1.
  const desktopCardW = 300;
  const desktopGap = isTablet ? 24 : 32;
  const totalDesktopW = TIMELINE.length * desktopCardW + (TIMELINE.length - 1) * desktopGap;
  const railPadLeft = vw * 0.06;
  const widthOfThreeCards = 3 * desktopCardW + 2 * desktopGap;
  const desktopStart = ((vw - railPadLeft - widthOfThreeCards) / vw) * 100;
  const desktopEnd = -((totalDesktopW - vw * 0.88) / vw) * 100;
  const desktopTranslateX = `calc(${desktopStart - railShift * (desktopStart - desktopEnd)}vw)`;

  // FIX 4: Give the section enough scroll-height so that the rail can
  // complete its full travel without the sticky panel snapping away too early.
  // Mobile needs less scroll-travel; desktop needs more cards' worth of height.
  const sectionH = isMobile
    ? vh + vh * 0.8
    : vh + vh * (TIMELINE.length * 0.35);

  const isShortDesktop = !isMobile && !isTablet && vh < 780;

  const titleSize = isMobile ? "clamp(32px, 10vw, 52px)" : isTablet ? "clamp(52px, 8vw, 80px)" : isShortDesktop ? "80px" : "clamp(64px, 7vw, 105px)";
  const bodySize = isMobile ? "clamp(13px, 3.5vw, 16px)" : isTablet ? "clamp(16px, 2.5vw, 22px)" : isShortDesktop ? "20px" : "clamp(18px, 1.8vw, 30px)";

  return (
    <div
      className="rounded-xl"
      ref={sectionRef}
      style={{ height: isMobile ? "" : sectionH, position: "relative", marginTop: 0 }}
    >
      <div
  className="
    pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28
    pb-12 sm:pb-16 md:pb-20 lg:pb-24
  "
  style={{
    position: "sticky",
    top: 0,
    height: isMobile ? "auto" : "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    justifyContent: isShortDesktop ? "flex-start" : "center",
    boxSizing: "border-box",
  }}
>
        {/* Header text block */}
        <div
  className="px-4 sm:px-6 md:px-10 lg:px-16"
  style={{
    textAlign: "center",
    marginBottom: isMobile ? 20 : isTablet ? 32 : isShortDesktop ? 24 : 48,
  }}
>
          <h2 style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 700,
            color: "#CE1010",
            lineHeight: 1.05,
            margin: "0 0 12px",
            fontSize: titleSize,
          }}>
            The Workforce<br />Behind Every Order
          </h2>
          <p style={{
            fontSize: bodySize,
            lineHeight: isMobile ? 1.5 : 1.4,
            color: "#343434",
            maxWidth: 900,
            margin: "0 auto 10px",
            fontWeight: 300,
            textAlign: "center",
          }}>
            India's doorstep economy operates at the intersection of logistics,
            technology, and human workforce. But that wasn't the case 15 years ago.
            Let's look at how the gig economy evolved with various business models
            over the last 3 decades.
          </p>
          <p style={{ fontSize: isMobile ? 11 : 14, color: "#aaa", fontStyle: "italic", margin: 0 }}>
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
        {/* FIX 6: overflow:visible here — the sticky container's own overflow:hidden
            clips cards at the viewport boundary, so a nested hidden wrapper was
            double-clipping cards mid-scroll. Setting it visible lets the sticky
            parent's clip be the only boundary, eliminating partial-card cutoffs. */}
        <div style={{ width: "100%", overflow: "visible", paddingBottom: isMobile ? 20 : 16 }}>
          <div style={{
            display: "flex",
            gap: isMobile ? MOBILE_GAP : isTablet ? 24 : 32,
            // FIX 7: align-items:flex-start keeps all cards top-aligned so
            // shorter cards don't stretch to match taller siblings.
            alignItems: "flex-start",
            paddingLeft: isMobile ? "4vw" : "6vw",
            paddingRight: isMobile ? "4vw" : "6vw",
            transform: isMobile
              ? `translateX(${mobileTranslateX}px)`
              : `translateX(${desktopTranslateX})`,
            willChange: "transform",
            // FIX 8: Slightly longer transition so fast scrolls don't produce a
            // jarring jump; linear keeps the motion tied 1-to-1 to scroll speed.
            transition: "transform 0.12s linear",
          }}>
            {TIMELINE.map((item, i) => (
              <TimelineCard
                key={item.year}
                item={item}
                entrance={cardEntrance(i)}
                isMobile={isMobile}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}