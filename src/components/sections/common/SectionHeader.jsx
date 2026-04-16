/**
 * @typedef {Object} SectionHeaderProps
 * @prop {string} title
 * @prop {string} description
 * @prop {string} [className]
 * @prop {string} [titleClassName]
 * @prop {string} [descriptionClassName]
 * @prop {string} [childrenClassName]
 */

/**
 * @param {SectionHeaderProps} props 
 */

function SectionHeader({ title, description, className, titleClassName, descriptionClassName, childrenClassName, children }) {
    return (
        <div className={`section-header mb-5 md:mb-10${className ? ` ${className}` : ''}`}>
            <div className="text-wrapper">
                <h2 className={`title${titleClassName ? ` ${titleClassName}` : ''}`}>{title}</h2>
                <p className={`description${descriptionClassName ? ` ${descriptionClassName}` : ''}`}>{description}</p>
            </div>
            {children && <div className={`children-wrapper${childrenClassName ? ` ${childrenClassName}` : ''}`}>{children}</div>}
        </div>
    )
}

export default SectionHeader;