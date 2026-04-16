import DailyAzkar from "@components/sections/DailyAzkar";
import NextPrayer from "@components/sections/NextPrayer";
import PrayerCards from "@components/sections/PrayerCards";

function HomePage() {
    return (
        <div className="home-page">
            {/* Next Prayer */}
            <NextPrayer />
            {/* Prayer Cards */}
            <PrayerCards />
            {/* Daily Azkar */}
            <DailyAzkar />
        </div>
    )
}

export default HomePage;