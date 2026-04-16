import AppLogo from "@components/common/AppLogo";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
    return (
        <header className="bg-primary text-white py-5 border-b border-b-primary-light sticky top-0 z-10">
            <div className="container flex items-center justify-between">
                {/* Search */}
                <form className="relative">
                    <input
                        required
                        type="text"
                        id="city_search"
                        name="city_search"
                        placeholder="البحث عن مدينة..."
                        className="w-full p-3 ps-10 rounded-full bg-primary-light border-2 border-transparent focus:border-secondary transition-colors peer"
                    />
                    <label htmlFor="city_search" className="absolute right-3 top-1/2 -translate-y-1/2 text-grey/50 peer-focus:text-secondary transition-colors">
                        <FontAwesomeIcon icon={faSearch} />
                    </label>
                </form>
                {/* App Logo */}
                <AppLogo />
            </div>
        </header>
    )
}

export default Header;