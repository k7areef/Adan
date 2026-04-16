import { useNextPrayer } from "@contexts/NextPrayerContext";
import { usePrayerTimes } from "@contexts/PrayerTimesContext";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NextPrayer() {

    const { isLoading, date } = usePrayerTimes();
    const { nextPrayer, timeRemaianig } = useNextPrayer();

    return (
        <section className="next-prayer-section bg-linear-to-b from-primary to-primary-light text-white rounded-b-4xl py-5 md:py-7" id="nextPrayer">
            <div className="container flex md:items-center justify-between gap-5 max-md:flex-col">
                {/* Next Prayer Info */}
                <div className="next-prayer-info">
                    {/* Heading */}
                    <div className="next-prayer-heading w-fit rounded-full py-2 px-4 bg-primary-light text-secondary font-semibold">
                        الصلاة القادمة: <span>{nextPrayer?.name}</span>
                    </div>
                    {/* Prayer Time */}
                    <div className="prayer-time font-bold text-3xl sm:text-5xl my-3 md:my-5">
                        {nextPrayer?.time}
                    </div>
                    {/* Location Info */}
                    <div className="location-info flex itmce gap-2 text-background">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>الرياض, الممكلة العربية السعودية</p>
                    </div>
                </div>
                {/* Remaining Time */}
                <div className="remaining-time p-3 md:p-5 rounded-2xl bg-linear-to-b from-primary-light to-transparent md:min-w-75">
                    <h3 className="text-secondary! font-semibold mb-3">الوقت المتبقي للأقامة</h3>
                    <div className="time-display font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl">{timeRemaianig}</div>
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
                                ) : isLoading ? (
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
                                ) : isLoading ? (
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