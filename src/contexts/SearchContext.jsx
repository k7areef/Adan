import React from "react";
import { useQuery } from "@tanstack/react-query";

const SearchContext = React.createContext();

export const SearchContextProvider = ({ children }) => {

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

    const value = {
        // Loading States:
        isCountriesLoading,
        isCitiesLoading,
        // Data:
        countries: countries,
        countyCities: cities,
        // States:
        selectedCountry, setSelectedCountry,
        selectedCity, setSelectedCity
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => React.useContext(SearchContext);