import React from "react";
import { faCloudMoon, faCloudSun, faMoon, faMountainSun, faSun } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

const PrayerTimesContext = React.createContext();

export const PrayerTimesContextProvider = ({ children }) => {

    const [selectedCountry, setSelectedCountry] = React.useState(null);

    const [times, setTimes] = React.useState([]);
    const search = null;

    const { isLoading, error, data } = useQuery({
        queryKey: [`prayer_times`],
        queryFn: async () => {
            try {

                let API = "https://api.aladhan.com/v1";

                // Search Request:
                if (search) {
                    API += `/timingsByCity/16-04-2026?city=${search}&country=EGY`
                } else {
                    // Default Request:
                    API += `/timings/16-04-2026?latitude=30.0434&longitude=31.2352`;
                }

                // Start Request:
                const res = await fetch(API);
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
        selectedCountry,
        setSelectedCountry
    };

    return (
        <PrayerTimesContext.Provider value={value}>
            {children}
        </PrayerTimesContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePrayerTimes = () => React.useContext(PrayerTimesContext);