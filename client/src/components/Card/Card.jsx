import React from "react";

import s from "./Card.module.css";

export default function Card ({name, image, temperaments, weight_min, weight_max}) {
    const temperament = temperaments?.map(e => e.name)

    // console.log(typeof temperaments);
    
    return (
        <div className={s.card}>
            <div className={s.info}>
            <h3 className={s.name}>{name}</h3>
            <h5 className={s.temps}>{ temperament?.join(", ")}</h5>
            <h5 className={s.w}>Weight Min: {weight_min} kg </h5>
            <h5 className={s.w}>Weight Max: {weight_max} kg </h5>
            </div>
            <div className={s.imageBox}>
            <img className={s.image} src={image} alt="Not found" width="170px" height="150px"/>
            </div>
        </div>
    )
}