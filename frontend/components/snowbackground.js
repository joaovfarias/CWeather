export default function FullWidthSnowBG() {
  const createFlakes = (count, layer = "back", seedOffset = 0) => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100; // percent across viewport
      // negative delays so many flakes are already mid-fall on mount
      const delay = Math.random() * -8.0;

      const duration =
        layer === "front"
          ? 8 + Math.random() * 8 // 8-16s for front
          : 12 + Math.random() * 10; // 12-22s for back

      const size =
        layer === "front" ? 8 + Math.random() * 6 : 4 + Math.random() * 4;

      const fallDistance = "120vh";

      // slightly vary whether this flake uses the sway animation
      const sway = Math.random() > 0.5 ? "snow-sway" : "";

      const style = {
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        // custom props used by CSS
        "--flake-size": `${Math.round(size)}px`,
        "--duration": `${duration}s`,
        "--delay": `${delay}s`,
        "--fallDistance": fallDistance,
      };

      const key = `${seedOffset}-${i}-flake`;

      return (
        <span
          key={key}
          className={`flake ${layer === "front" ? "front" : "back"} ${sway}`}
          style={style}
        />
      );
    });
  };

  return (
    <div className="snow-bg">
      <div className="snow-full snow-back">{createFlakes(180, "back", 1)}</div>
      <div className="snow-full snow-front">{createFlakes(90, "front", 2)}</div>
    </div>
  );
}
