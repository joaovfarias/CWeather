import NightBackground from "./nightbackground";
import OvercastBackground from "./overcastbackground";
import RainBackground from "./rainbackground";
import SnowBackground from "./snowbackground";
import SunnyBackground from "./sunnybackground";
import ThunderStormBackground from "./thunderstormbackground";

export default function Background({ current, condition }) {
  return (
    <div className="absolute inset-0">
      {(condition?.toLowerCase().includes("overcast") ||
        condition?.toLowerCase().includes("mist") ||
        condition?.toLowerCase().includes("fog")) &&
      current?.is_day === 1 ? (
        <OvercastBackground />
      ) : condition?.toLowerCase().includes("rain") ||
        condition?.toLowerCase().includes("drizzle") ||
        condition?.toLowerCase().includes("sleet") ? (
        <RainBackground />
      ) : condition?.toLowerCase().includes("thundery") ? (
        <ThunderStormBackground />
      ) : condition?.toLowerCase().includes("snow") ||
        condition?.toLowerCase().includes("blizzard") ? (
        <SnowBackground />
      ) : current?.is_day === 1 ? (
        <SunnyBackground />
      ) : (
        <NightBackground />
      )}
    </div>
  );
}
