import { useQuery } from "@tanstack/react-query";
import React from "react";

const PrayerTimesContext = React.createContext();

export const PrayerTimesContextProvider = ({ children }) => {

    const [search, setSearch] = React.useState(null);

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

    const value = {
        // States:
        isLoading,
        // Data:
        error,
        timings: data?.timings || [],
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