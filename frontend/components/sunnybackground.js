export default function SunnyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-sky-300">
      {/* Sun */}
      <div className="sun"></div>

      {/* Clouds */}
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>
    </div>
  );
}
