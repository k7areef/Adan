import React from "react";
import { usePrayerTimes } from "./PrayerTimesContext";

const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
};

const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

const NextPrayerContext = React.createContext();

export const NextPrayerContextProvider = ({ children }) => {

    const { isLoading, times } = usePrayerTimes();

    const [next, setNext] = React.useState(null);

    React.useEffect(() => {
        if (isLoading || !times || times?.length === 0) return;

        const nextPrayer = times.find(t => {

            const prayerTime = timeToMinutes(t.time);
            const currentTime = getCurrentMinutes();

            if (prayerTime > currentTime) {
                return t;
            }
        });

        setNext(nextPrayer);
    }, [isLoading, times]);

    const value = {
        next
    };

    return (
        <NextPrayerContext.Provider value={value}>
            {children}
        </NextPrayerContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNextPrayer = () => React.useContext(NextPrayerContext);