import React from "react";
import { useQuery } from "@tanstack/react-query";

const SearchContext = React.createContext();

export const SearchContextProvider = ({ children }) => {

    const [userLocation, setUserLocation] = React.useState(null);
    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [selectedCity, setSelectedCity] = React.useState(null);

    const { data: countries, isLoading: isCountriesLoading } = useQuery({
        queryKey: ['countries'],
        queryFn: async () => {
            const res = await fetch(`/api/countries`);
            const data = await res.json();
            if (!selectedCountry) setSelectedCountry(data[0]);
            return data;
        }
    });

    const { data: cities, isLoading: isCitiesLoading } = useQuery({
        queryKey: ['cities', selectedCountry?.name],
        queryFn: async () => {
            const res = await fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ country: selectedCountry.name })
            });
            const resData = await res.json();
            if (resData.data) setSelectedCity(resData.data[0]);
            return resData.data;
        },
        enabled: !!selectedCountry?.name,
    });

    React.useEffect(() => {
        if (!userLocation || !countries || countries.length === 0) return;

        let closestCountry = null;
        let minDistance = Infinity;

        countries.forEach(country => {
            if (!country.latlng) return;

            const dLat = country.latlng[0] - userLocation.lat;
            const dLng = country.latlng[1] - userLocation.lng;

            const distance = Math.sqrt(dLat * dLat + dLng * dLng);

            if (distance < minDistance) {
                minDistance = distance;
                closestCountry = country;
            }
        });

        if (closestCountry) {
            setSelectedCountry(closestCountry);
        }
    }, [countries, userLocation]);

    const value = {
        // Loading States:
        isCountriesLoading,
        isCitiesLoading,
        // Data:
        countries: countries,
        countyCities: cities,
        // States:
        selectedCountry, setSelectedCountry,
        selectedCity, setSelectedCity,
        setUserLocation
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => React.useContext(SearchContext);