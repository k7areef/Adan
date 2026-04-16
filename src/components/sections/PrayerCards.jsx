import React from "react";
import { usePrayerTimes } from "@contexts/PrayerTimesContext";
import { faCloudMoon, faCloudSun, faMoon, faMountainSun, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PrayerCards() {

    const { isLoading, timings } = usePrayerTimes();

    const PRAYER_TIMES = React.useMemo(() => {

        if (isLoading || !timings || timings?.length === 0) return [];

        const targetTimes = [
            {
                id: "Fajr",
                name: "الفجر",
                icon: faCloudMoon
            },
            {
                id: "Sunrise",
                name: "الشروق",
                icon: faSun
            },
            {
                id: "Dhuhr",
                name: "الظهر",
                icon: faSun
            },
            {
                id: "Asr",
                name: "العصر",
                icon: faCloudSun
            },
            {
                id: "Maghrib",
                name: "المغرب",
                icon: faMountainSun
            },
            {
                id: "Isha",
                name: "العشاء",
                icon: faMoon
            }
        ];

        return targetTimes.map(pt => {

            const time = timings[pt.id];
            const period = Number(String(time).split(":")[0]) > 12 ? "PM" : "AM";

            return {
                ...pt,
                time,
                period
            }
        });
    }, [isLoading, timings]);

    return (
        <section className="prayer-cards-section py-5 md:py-10" id="prayerCards">
            <div className="container">
                <div className="prayer-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-5">
                    {
                        isLoading ? (
                            Array.from({ length: 6 }).map((_, index) => (<div className="prayer-card-skeleton bg-primary/30 animate-pulse p-3 md:p-5 rounded-xl h-39.25 md:h-42.5 last-of-type:lg:col-span-3 last-of-type:xl:col-span-5 last-of-type:2xl:col-span-1" key={index}>
                                10
                            </div>))
                        ) : (
                            PRAYER_TIMES.map((prayer, index) => (<div className="prayer-card last-of-type:lg:col-span-3 last-of-type:xl:col-span-5 last-of-type:2xl:col-span-1 bg-white shadow p-3 md:p-5 rounded-xl relative" key={index}>
                                {/* Period */}
                                <div className="period font-bold capitalize absolute left-3 top-3 text-primary-muted text-sm">{prayer.period}</div>
                                {/* Icon */}
                                <div className="icon w-10 h-10 rounded-lg flex items-center justify-center bg-grey mb-5">
                                    <FontAwesomeIcon icon={prayer.icon} />
                                </div>
                                {/* Name */}
                                <h3 className="prayer-name font-bold text-xl mb-1.5">{prayer.name}</h3>
                                {/* Time */}
                                <div className="prayer-time font-bold text-xl sm:text-3xl">{prayer.time}</div>
                            </div>))
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default PrayerCards;