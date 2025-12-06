export default function FullWidthRainBG() {
  const createDrops = (count, layer = "back", seedOffset = 0) => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100; // percent
      const delay = Math.random() * -2.0; // staggered start

      const duration =
        layer === "front"
          ? 0.8 + Math.random() * 0.9
          : 1.4 + Math.random() * 1.6;

      const height =
        layer === "front" ? 12 + Math.random() * 26 : 8 + Math.random() * 18;
      const opacity =
        layer === "front"
          ? 0.6 + Math.random() * 0.4
          : 0.2 + Math.random() * 0.36;

      // drop inline style including CSS variable for fall distance
      const dropStyle = {
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        height: `${height}px`,
        opacity: opacity,
        // fall distance: slightly more than viewport height for natural landing
        "--fallDistance": "120vh",
      };

      const key = `${seedOffset}-${i}-drop`;

      return (
        <span
          key={key}
          className={`drop ${layer === "front" ? "front" : "back"}`}
          style={dropStyle}
        />
      );
    });
  };

  return (
    <div className="rain-bg">
      <div className="rain rain-full rain-back">
        {createDrops(160, "back", 1)}
      </div>
      <div className="rain rain-full rain-front">
        {createDrops(90, "front", 2)}
      </div>
    </div>
  );
}
