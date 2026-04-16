import { Link } from "react-router-dom";

/**
 * @typedef {Object} CustomButtonProps
 * @property {string} [to]
 * @property {string} [href]
 * @property {string} [type]
 * @property {string} [className]
 * @property {React.ReactNode} children
 * @property {'primary' | 'secondary'} [variant]
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement> | import("react-router-dom").LinkProps} [props]
 */

/**
 * @param {ButtonProps & React.HTMLAttributes<HTMLElement>} props
 * @typedef {CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & import("react-router-dom").LinkProps} ButtonProps
 */

function Button({ variant = "primary", to, href, type, className, children }) {

    const variants = {
        primary: "",
        secondary: ""
    }

    const classNames = `px-4 py-2 sm:py-3 rounded-md font-semibold transition duration-300 ease-in-out ${variants[variant]}${className ? ` ${className}` : ""}`;

    if (href) {
        return (
            <a
                href={href}
                className={classNames}
            >
                {children}
            </a>
        )
    }

    if (to) {
        return (
            <Link
                to={to}
                className={classNames}
            >
                {children}
            </Link>
        )
    }

    return (
        <button
            className={classNames}
            type={type || "button"}
        >
            {children}
        </button>
    )
}

export default Button;