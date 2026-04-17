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

    const [nextPrayer, setNextPrayer] = React.useState(null);
    const [timeRemaianig, setTimeRemaining] = React.useState();

    const findNextPrayer = React.useCallback(() => {
        if (isLoading || !times || times.length === 0) return;

        const currentTime = getCurrentMinutes();

        let next = times.find(t => timeToMinutes(t.time) > currentTime);

        if (!next) {
            next = times[0];
        }

        setNextPrayer(next);
    }, [isLoading, times]);

    React.useEffect(() => { // Find Next Prayer After Mount:
        findNextPrayer();
    }, [findNextPrayer]);

    React.useEffect(() => { // Update Remaining Time:
        if (!nextPrayer?.time) return;
        const calculateTime = () => {
            const now = new Date();

            const [hours, minutes] = nextPrayer.time.split(':').map(Number);
            const target = new Date();
            target.setHours(hours, minutes, 0, 0);

            if (target < now) {
                target.setDate(target.getDate() + 1);
            }

            const diff = target - now;

            if (diff <= 0) {
                setTimeRemaining("00:00:00");
                // Find Next Prayer From New:
                findNextPrayer();
                return;
            }

            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            const format = (num) => String(num).padStart(2, '0');
            setTimeRemaining(`${format(h)}:${format(m)}:${format(s)}`);
        };

        calculateTime();

        const timer = setInterval(calculateTime, 1000);

        return () => clearInterval(timer);
    }, [findNextPrayer, nextPrayer]);

    const value = {
        nextPrayer,
        timeRemaianig
    };

    return (
        <NextPrayerContext.Provider value={value}>
            {children}
        </NextPrayerContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNextPrayer = () => React.useContext(NextPrayerContext);