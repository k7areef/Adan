import { faMosque } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function AppLogo() {
    return (
        <Link
            to={'/'}
            className="text-2xl font-semibold uppercase flex items-center gap-2 max-sm:ms-auto"
        >
            <span>Adan</span>
            <FontAwesomeIcon icon={faMosque} className="text-secondary" />
        </Link>
    )
}

export default AppLogo;