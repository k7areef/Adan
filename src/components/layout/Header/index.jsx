import AppLogo from "@components/common/AppLogo";
import CountriesSelect from "./components/CountriesSelect";
import CitiesSelect from "./components/CitiesSelect";
import GetAccessLocation from "./components/GetAccessLocation";

function Header() {
    return (
        <header className="bg-primary text-white py-5 border-b border-b-primary-light sticky top-0 z-10">
            <div className="container flex items-center justify-between">
                {/* Search */}
                <div className="header-search flex gap-3">
                    {/* Select Country */}
                    <CountriesSelect />
                    {/* Select City */}
                    <CitiesSelect />
                    {/* Location */}
                    <GetAccessLocation />
                </div>
                {/* App Logo */}
                <AppLogo />
            </div>
        </header>
    )
}

export default Header;