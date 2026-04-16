import { useSearchContext } from "@contexts/SearchContext";
import { faAngleDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CountryFlag = ({ src, alt }) => {
    return <img src={src} alt={alt} width={20} />;
};

function CountriesSelect() {

    const { isCountriesLoading, countries, selectedCountry, setSelectedCountry } = useSearchContext();

    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const selectRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutSide = (e) => {
            if (!selectRef.current || selectRef.current.contains(e.target)) return;
            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutSide);
        return () => document.removeEventListener("mousedown", handleClickOutSide);
    }, []);

    const handleSelect = React.useCallback((country) => {
        setIsOpen(false);
        setSearchTerm("");
        setSelectedCountry(country);
    }, [setSelectedCountry]);

    const filteredCountries = countries?.filter(country =>
        country.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="countries-select w-50 relative" ref={selectRef}>
            {/* Select Input */}
            <div className="input-group relative h-full">
                <label htmlFor="countySearch" className="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon={isCountriesLoading ? faSpinner : faAngleDown} className={`transition-transform will-change-transform ${isCountriesLoading ? "animate-spin" : isOpen ? "rotate-180" : ""}`} />
                </label>
                <input
                    type="text"
                    id="countySearch"
                    autoComplete="off"
                    name="countySearch"
                    disabled={isCountriesLoading}
                    onFocus={() => setIsOpen(true)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={isOpen ? searchTerm : (selectedCountry ? selectedCountry.nativeName : "")}
                    placeholder={selectedCountry ? selectedCountry.nativeName : "ابحث عن بلد..."}
                    className={`countries-select-btn transition-colors will-change-auto ${isOpen ? "bg-primary-dark" : "bg-primary-light"} py-2 px-3 ${selectedCountry ? "ps-10" : "ps-4"} rounded-full w-full flex items-center justify-between`}
                />
                {
                    selectedCountry &&
                    <label htmlFor="countySearch" className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CountryFlag src={selectedCountry.flags.svg} alt={selectedCountry.nativeName} />
                    </label>
                }
            </div>
            {/* Select Options */}
            <div className={`select-options-wrapper transition will-change-auto ${isOpen ? "opacity-100 translate-y-0" : "translate-y-2 opacity-0 pointer-events-none"} max-sm:max-w-70 h-100 absolute right-0 min-w-full mt-3 z-10 rounded-md border-2 border-secondary overflow-hidden`}>
                <div className="select-options h-full overflow-y-auto space-y-1 bg-primary-light p-2">
                    {
                        isCountriesLoading ? (
                            <>جاري التحميل</>
                        ) : filteredCountries?.length === 0 ? (
                            <>لا يوجد بيانات متطابقة لكلمات البحث</>
                        ) : filteredCountries?.length > 0 ? (
                            filteredCountries?.map((country, index) => (<button
                                key={index}
                                onClick={() => handleSelect(country)}
                                className={`select-option-btn text-nowrap flex items-center gap-3 p-2 ${selectedCountry?.alpha3Code === country.alpha3Code ? "bg-primary-dark" : "bg-primary sm:hover:bg-primary-dark"} w-full rounded-sm transition-colors`}
                            >
                                <CountryFlag src={country.flags.svg} alt={country.nativeName} />
                                <span className="truncate text-right w-full">{country.nativeName}</span>
                            </button>))
                        ) : (
                            <>لا توجد بيانات متاحه حالياً</>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CountriesSelect;