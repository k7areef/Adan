import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PRAYER_TIMES = [
    {
        id: "fajr",
        name: "الفجر",
        time: "05:12",
        period: "AM",
        icon: "icon"
    },
    {
        id: "sunrise",
        name: "الشروق",
        time: "06:34",
        period: "AM",
        icon: "icon"
    },
    {
        id: "dhuhr",
        name: "الظهر",
        time: "11:58",
        period: "AM",
        icon: "icon"
    },
    {
        id: "asr",
        name: "العصر",
        time: "15:02",
        period: "PM",
        icon: "icon"
    },
    {
        id: "maghrib",
        name: "المغرب",
        time: "18:42",
        period: "PM",
        isActive: true,
        icon: "icon"
    },
    {
        id: "isha",
        name: "العشاء",
        time: "20:12",
        period: "PM",
        icon: "icon"
    },
];

function PrayerCards() {
    return (
        <section className="prayer-cards-section py-5 md:py-10" id="prayerCards">
            <div className="container">
                <div className="prayer-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-5">
                    {
                        PRAYER_TIMES.map((prayer, index) => (<div className="prayer-card last-of-type:lg:col-span-3 last-of-type:xl:col-span-5 last-of-type:2xl:col-span-1 bg-white shadow p-3 md:p-5 rounded-xl relative" key={index}>
                            {/* Period */}
                            <div className="period font-bold capitalize absolute left-3 top-3 text-primary-muted text-sm">{prayer.period}</div>
                            {/* Icon */}
                            <div className="icon w-10 h-10 rounded-lg flex items-center justify-center bg-grey mb-5">
                                <FontAwesomeIcon icon={faSun} />
                            </div>
                            {/* Name */}
                            <h3 className="prayer-name font-bold text-xl mb-1.5">{prayer.name}</h3>
                            {/* Time */}
                            <div className="prayer-time font-bold text-xl sm:text-3xl">{prayer.time}</div>
                        </div>))
                    }
                </div>
            </div>
        </section>
    )
}

export default PrayerCards;