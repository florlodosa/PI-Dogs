import React from "react";

export default function Card ({name, image, temperaments, weight}) {
    // const spacedTemperaments = typeof temperaments === "string"?.match(/[A-Z]*[^A-Z]+/g) 
    return (
        <div>
            <h3>{name}</h3>
            <h5>{temperaments}</h5>
            <img src={image} alt="Not found" width="200px" height="250px"/>
        </div>
    )
}

