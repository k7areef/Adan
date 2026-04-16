import React from "react";
import { faAngleDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchContext } from "@contexts/SearchContext";

function CitiesSelect() {

    const { isCountriesLoading, isCitiesLoading, selectedCountry, selectedCity, setSelectedCity, countyCities } = useSearchContext();


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

    const handleSelect = (city) => {
        setIsOpen(false);
        setSearchTerm("");
        setSelectedCity(city);
    };

    const filteredCities = countyCities?.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="cities-select w-50 relative" ref={selectRef}>
            {/* Select Input */}
            <div className="input-group relative h-full">
                <label htmlFor="citySearch" className="absolute left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon={(isCitiesLoading || isCountriesLoading) ? faSpinner : faAngleDown} className={`transition-transform will-change-transform ${(isCitiesLoading || isCountriesLoading) ? "animate-spin" : isOpen ? "rotate-180" : ""}`} />
                </label>
                <input
                    type="text"
                    id="citySearch"
                    name="citySearch"
                    autoComplete="off"
                    onFocus={() => setIsOpen(true)}
                    disabled={(isCitiesLoading || isCountriesLoading) || !selectedCountry}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    title={!selectedCountry ? "يرجي أختيار البلد" : ""}
                    value={isOpen ? searchTerm : (selectedCity ? selectedCity : "")}
                    placeholder={selectedCity ? selectedCity : "ابحث عن منطقة..."}
                    className={`cities-select-btn disabled:opacity-50 transition will-change-auto ${isOpen ? "bg-primary-dark" : "bg-primary-light"} py-2 px-3 rounded-full w-full flex items-center justify-between`}
                />
            </div>
            {/* Select Options */}
            <div className={`select-options-wrapper transition will-change-auto ${isOpen ? "opacity-100 translate-y-0" : "translate-y-2 opacity-0 pointer-events-none"} max-sm:max-w-70 h-100 absolute right-0 min-w-full mt-3 z-10 rounded-md border-2 border-secondary overflow-hidden`}>
                <div className="select-options h-full overflow-y-auto space-y-1 bg-primary-light p-2">
                    {
                        (isCitiesLoading || isCountriesLoading) ? (
                            <>جاري التحميل</>
                        ) : filteredCities?.length === 0 ? (
                            <>لا يوجد بيانات متطابقة لكلمات البحث</>
                        ) : filteredCities?.length > 0 ? (
                            filteredCities?.map((city, index) => (<button
                                key={index}
                                onClick={() => handleSelect(city)}
                                className={`select-option-btn text-nowrap flex items-center gap-3 p-2 ${selectedCity === city ? "bg-primary-dark" : "bg-primary sm:hover:bg-primary-dark"} w-full rounded-sm transition-colors`}
                            >
                                {city}
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

export default CitiesSelect;