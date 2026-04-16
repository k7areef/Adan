import { faCloudMoon, faCloudSun, faMoon, faMountainSun, faSun } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PrayerTimesContext = React.createContext();

export const PrayerTimesContextProvider = ({ children }) => {

    const [search, setSearch] = React.useState(null);
    const [times, setTimes] = React.useState([]);

    const { isLoading, error, data } = useQuery({
        queryKey: [`prayer_times`],
        queryFn: async () => {
            try {
                const res = await fetch('https://api.aladhan.com/v1/timings/16-04-2026?latitude=30.0434&longitude=31.2352');
                const resData = await res.json();
                return resData.data;
            } catch (err) {
                console.log(err);
            }
        },
        enabled: true,
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
        // Actions:
        search,
        setSearch
    };

    return (
        <PrayerTimesContext.Provider value={value}>
            {children}
        </PrayerTimesContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePrayerTimes = () => React.useContext(PrayerTimesContext);