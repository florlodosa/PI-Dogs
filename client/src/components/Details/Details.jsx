import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../../actions";
import { Link } from "react-router-dom";
import s from './Details.module.css'

export default function Details (props) {
    const dispach = useDispatch();

    useEffect(()=>{
        dispach(getDetails(props.match.params.id))
    }, [dispach, props.match.params.id])

    const myDog = useSelector( (state) => state.details)

    const temps = myDog[0]?.temperaments?.map((e) => e.name);

    return (
        <div className={s.container}>
            <div className={s.card}>
            {
                myDog.length > 0 
                ? <div>
                    <h1 className={s.name}>{myDog[0].name}</h1>
                    <img src={myDog[0].image} alt='Not found' width="170px" height="150px" className={s.image}/>
                    <p className={s.temps}>
                    {temps ? temps.join(", ") : "This dog hasn't got temperaments"}
                    </p>
                    <p className={s.info}>Life Span: {myDog[0].life_span}</p>
                    <p className={s.info}>Weight Min: {myDog[0].weight_min} Kg</p>
                    <p className={s.info}>Weight Max: {myDog[0].weight_max} Kg</p>
                    <p className={s.info}>Height Min: {myDog[0].height_min} Kg</p>
                    <p className={s.info}>Height Max: {myDog[0].height_max} Kg</p>
                </div>
                : <p>Loading...</p>
            }
            </div>
            <Link to='/home' className={s.link}>
                <button className={s.btn}>Go Back</button>
            </Link>
        </div>
    )
}