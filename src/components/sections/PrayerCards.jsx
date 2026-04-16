import React from "react";
import { usePrayerTimes } from "@contexts/PrayerTimesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNextPrayer } from "@contexts/NextPrayerContext";

function PrayerCards() {

    const { isLoading, times } = usePrayerTimes();
    const { nextPrayer } = useNextPrayer();

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
                            times.map((prayer, index) => {

                                const isActive = nextPrayer?.id === prayer.id;

                                return (
                                    <div className={`prayer-card ${isActive ? "bg-primary" : "bg-white"} transition-colors last-of-type:lg:col-span-3 last-of-type:xl:col-span-5 last-of-type:2xl:col-span-1 shadow p-3 md:p-5 rounded-xl relative`} key={index}>
                                        {/* Period */}
                                        <div className={`period font-bold ${isActive ? "text-white" : "text-primary-muted"} transition-colors capitalize absolute left-3 top-3 text-sm`}>{prayer.period}</div>
                                        {/* Icon */}
                                        <div className={`icon ${isActive ? "bg-secondary" : "bg-grey"} transition-colors w-10 h-10 rounded-lg flex items-center justify-center mb-5`}>
                                            <FontAwesomeIcon icon={prayer.icon} />
                                        </div>
                                        {/* Name */}
                                        <h3 className={`prayer-name font-bold text-xl mb-1.5 ${isActive ? "text-white!" : ""} transition-colors`}>{prayer.name}</h3>
                                        {/* Time */}
                                        <div className={`prayer-time font-bold text-xl sm:text-3xl ${isActive ? "text-white" : ""} transition-colors`}>{prayer.time}</div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default PrayerCards;