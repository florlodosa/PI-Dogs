import React from "react";

import s from "./Card.module.css";

export default function Card ({name, image, temperaments, weight}) {
    const temperament = temperaments?.map(e => e.name)

    // console.log(typeof temperaments);
    
    return (
        <div className={s.card}>
            <h3 className={s.name}>{name}</h3>
            <h5 className={s.temps}>{ temperament?.join(", ")}</h5>
            <h5 className={s.w}>Weight: approximately {weight} kg </h5>
            <img className={s.image} src={image} alt="Not found" width="170px" height="150px"/>
        </div>
    )
}