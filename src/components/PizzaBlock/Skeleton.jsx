import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="133" cy="124" r="123" />
        <rect x="0" y="257" rx="10" ry="10" width="280" height="37" />
        <rect x="0" y="319" rx="10" ry="10" width="282" height="78" />
        <rect x="0" y="425" rx="10" ry="10" width="96" height="30" />
        <rect x="128" y="421" rx="23" ry="23" width="150" height="46" />
    </ContentLoader>
)

export default MyLoader



