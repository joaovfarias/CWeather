export default function NightBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden night-sky">
      {/* Moon */}
      <div className="moon"></div>

      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className={`star star-${i}`}></div>
      ))}

      <div className="night-cloud cloud-1"></div>
      <div className="night-cloud cloud-2"></div>
    </div>
  );
}
