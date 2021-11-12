import React from "react";
import { Link } from "react-router-dom";
import s from './LandingPage.module.css'

export default function LandingPage() {
    return ( 
        <div className={s.landingPage}>
            <h1 className={s.title}>Welcome</h1>
            <Link to ="/home" className={s.link}>
                <button className={s.btn}>Home</button>
            </Link>
        </div>
    )
}