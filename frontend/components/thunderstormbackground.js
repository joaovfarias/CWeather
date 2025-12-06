import React, { useEffect, useState } from "react";

export default function ThunderstormBG() {
  const [drops, setDrops] = useState([]);
  const [lightning, setLightning] = useState(null);

  // generate drops across the full viewport width while keeping the thunderstorm
  // speed/amount characteristics from the original cloud-based implementation.
  const generateDrops = (count, layer, seedOffset = 0) => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const leftPercent = Math.random() * 100;
      const startTop = -8; // start slightly above the viewport
      const duration =
        layer === "front"
          ? 0.45 + Math.random() * 0.6
          : 0.6 + Math.random() * 0.8;
      const delay = -Math.random() * duration;
      const height =
        layer === "front" ? 14 + Math.random() * 22 : 10 + Math.random() * 18;
      const opacity =
        layer === "front"
          ? 0.7 + Math.random() * 0.3
          : 0.4 + Math.random() * 0.4;
      const fallDistance = window.innerHeight + 60;
      const splashDelay = delay + duration * 0.98;
      const splashDuration = 0.2 + Math.random() * 0.35;
      const splashTop = Math.max(8, window.innerHeight - 18);

      items.push({
        id: `${seedOffset}-${i}`,
        left: leftPercent,
        top: startTop,
        duration,
        delay,
        height,
        opacity,
        fallDistance,
        splashDelay,
        splashDuration,
        splashTop,
        layer,
      });
    }
    return items;
  };

  useEffect(() => {
    const compute = () => {
      // Keep the original total counts used previously across the three clouds:
      // back: 36 + 36 + 30 = 102
      // front: 28 + 28 + 20 = 76
      const backDrops = generateDrops(102, "back", 1);
      const frontDrops = generateDrops(76, "front", 2);
      setDrops([...backDrops, ...frontDrops]);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const scheduleStrike = () => {
      const next = 1500 + Math.random() * 6000; // 1.5s - 7.5s
      setTimeout(() => {
        if (cancelled) return;
        const x = 60 + Math.random() * (window.innerWidth - 120);
        setLightning({ x, id: Date.now() });
        // quick bright flash overlay
        setTimeout(() => setLightning(null), 420 + Math.random() * 300);
        // schedule next
        scheduleStrike();
      }, next);
    };

    scheduleStrike();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rain-bg thunder-bg">
      {drops.map((d) => (
        <React.Fragment key={d.id}>
          <span
            className={`drop ${d.layer === "front" ? "front" : "back"}`}
            style={{
              left: `${d.left}%`,
              top: `${d.top}px`,
              height: `${d.height}px`,
              opacity: d.opacity,
              "--fallDistance": `${d.fallDistance}px`,
              "--duration": `${d.duration}s`,
              "--delay": `${d.delay}s`,
            }}
          />
        </React.Fragment>
      ))}

      {lightning && (
        <>
          <div className="thunder-flash" />
          <div className="lightning" style={{ left: `${lightning.x}px` }} />
        </>
      )}
    </div>
  );
}
