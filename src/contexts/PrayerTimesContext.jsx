import React from "react";
import { faCloudMoon, faCloudSun, faMoon, faMountainSun, faSun } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "./SearchContext";

const PrayerTimesContext = React.createContext();

export const PrayerTimesContextProvider = ({ children }) => {

    const [times, setTimes] = React.useState([]);
    const { isCountriesLoading, isCitiesLoading, selectedCountry, selectedCity } = useSearchContext();

    const { isLoading, error, data } = useQuery({
        queryKey: [`prayer_times`, selectedCountry?.alpha3Code, selectedCity,],
        queryFn: async () => {
            try {
                const API = `https://api.aladhan.com/v1/timingsByCity/16-04-2026?country=${selectedCountry?.alpha3Code || "EGY"}&city=${selectedCity || "cairo"}`;
                const res = await fetch(API);
                const resData = await res.json();
                return resData.data;
            } catch (err) {
                console.log(err);
            }
        },
        enabled: Boolean(!(isCountriesLoading || isCitiesLoading)),
        refetchOnWindowFocus: false
    });

    React.useEffect(() => {

        if (isLoading || !data || data?.timings?.length === 0) return;


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

        setTimes(targetTimes.map(pt => {

            const time = data?.timings[pt.id];
            const period = Number(String(time).split(":")[0]) > 12 ? "PM" : "AM";

            return {
                ...pt,
                time,
                period
            }
        }));

    }, [data, isLoading]);

    const value = {
        // States:
        isLoading,
        // Data:
        error,
        timings: data?.timings || [],
        times: times,
        date: data?.date || null,
    };

    return (
        <PrayerTimesContext.Provider value={value}>
            {children}
        </PrayerTimesContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePrayerTimes = () => React.useContext(PrayerTimesContext);