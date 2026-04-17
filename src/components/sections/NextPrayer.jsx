import { useNextPrayer } from "@contexts/NextPrayerContext";
import { usePrayerTimes } from "@contexts/PrayerTimesContext";
import { useSearchContext } from "@contexts/SearchContext";
import { faLocationDot, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NextPrayer() {

    const { isLoading, date } = usePrayerTimes();
    const { nextPrayer, timeRemaianig } = useNextPrayer();
    const { isCountriesLoading, isCitiesLoading, selectedCountry, selectedCity } = useSearchContext();

    return (
        <section className="next-prayer-section bg-linear-to-b from-primary to-primary-light text-white rounded-b-4xl py-5 md:py-7" id="nextPrayer">
            <div className="container flex md:items-center justify-between gap-5 max-md:flex-col">
                {/* Next Prayer Info */}
                <div className="next-prayer-info">
                    {/* Heading */}
                    <div className="next-prayer-heading w-fit rounded-full py-2 px-4 bg-primary-dark text-secondary font-semibold">
                        الصلاة القادمة: <span>{
                            (isCountriesLoading || isCitiesLoading || isLoading) ? (
                                <>جاري تحميل البيانات</>
                            ) : (
                                nextPrayer?.name
                            )
                        }</span>
                    </div>
                    {/* Prayer Time */}
                    <div className="prayer-time font-bold text-3xl sm:text-5xl my-3 md:my-5">
                        {
                            (isCountriesLoading || isCitiesLoading || isLoading) ? (
                                <>00:00</>
                            ) : (
                                nextPrayer?.time
                            )
                        }
                    </div>
                    {/* Location Info */}
                    <div className="location-info flex items-center gap-2 text-background">
                        <FontAwesomeIcon
                            icon={(isCountriesLoading || isCitiesLoading || isLoading) ? faSpinner : faLocationDot}
                            className={`${(isCountriesLoading || isCitiesLoading || isLoading) ? "animate-spin" : ""}`}
                        />
                        <p dir="ltr">
                            {
                                (isCountriesLoading || isCitiesLoading || isLoading) ? (
                                    <>جاري تحميل البيانات...</>
                                ) : (
                                    <>{selectedCountry?.nativeName}, {selectedCity}</>
                                )
                            }
                        </p>
                    </div>
                </div>
                {/* Remaining Time */}
                <div className="remaining-time p-3 md:p-5 rounded-2xl bg-linear-to-b from-primary-light to-transparent md:min-w-75 h-41.5 md:h-52">
                    <h3 className="text-secondary! font-semibold mb-3">الوقت المتبقي للأقامة</h3>
                    <div className="time-display font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl">{timeRemaianig || "00:00:00"}</div>
                    {/* Date Info */}
                    <div className="date-info mt-3 md:mt-5">
                        <h4 className="hijri-date text-white! font-semibold text-lg sm:text-xl md:text-2xl mb-1.5 md:mb-3">
                            {
                                date ? (
                                    <>
                                        {date?.hijri?.month?.number}
                                        {date?.hijri?.month?.ar}
                                        {date?.hijri?.year}
                                    </>
                                ) : (isCountriesLoading || isCitiesLoading || isLoading) ? (
                                    <>جاري تحميل البيانات...</>
                                ) : (
                                    <>لا توجد بيانات متاحة حالياً</>
                                )
                            }
                        </h4>
                        <h5 className="milady-date text-white! text-lg">
                            {
                                date ? (
                                    new Date(date?.readable).toLocaleDateString("ar", {
                                        dateStyle: "full"
                                    })
                                ) : (isCountriesLoading || isCitiesLoading || isLoading) ? (
                                    <>جاري تحميل البيانات...</>
                                ) : (
                                    <>لا توجد بيانات متاحة حالياً</>
                                )
                            }
                        </h5>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NextPrayer;