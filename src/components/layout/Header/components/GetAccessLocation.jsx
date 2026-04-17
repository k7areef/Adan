import { useSearchContext } from "@contexts/SearchContext";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function GetAccessLocation() {

    const { setUserLocation } = useSearchContext();

    const handleGetLocation = React.useCallback(() => {
        if (!navigator.geolocation) {
            alert("المتصفح بتاعك مابيدعمش تحديد الموقع.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setUserLocation({
                    lat: latitude,
                    lng: longitude
                })
            },
            (error) => {
                console.error(error);
                alert("حصل مشكلة وأحنا بنجيب موقعك، اتأكد إنك مفعل الـ GPS.");
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }, [setUserLocation]);

    return (
        <button
            type="button"
            onClick={handleGetLocation}
            title="السماح بالصول لموقعك الجغرافي"
            aria-label="السماح بالصول لموقعك الجغرافي"
            className="w-10 h-10 rounded-full transition-colors bg-primary-light sm:hover:bg-primary-dark"
        >
            <FontAwesomeIcon icon={faLocation} />
            <span className="sr-only">Get Access Location</span>
        </button>
    )
}

export default GetAccessLocation;