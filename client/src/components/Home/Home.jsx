import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";

export default function Home() {
    const dispatch = useDispatch();
    const allBreeds = useSelector((state) => state.breeds)
    //useSelector<3 trae todo lo que esta en el estado de breeds(mas facil que hacer el mapstate to props)

    useEffect( () => {
        dispatch(getBreeds());
        //use dispach es como hacer el dispach to props
    }, [])
    //useEffect trae del state las breeds cuando el component se monta

    function handleClick(e){
        e.preventDefault();
        dispatch(getBreeds());
    }

    return (
        <div className="Home">
            <Link to='/dog'>Create new Recipe</Link>
            <h1>Dogs</h1>
            <button onClick={e => {handleClick(e)}}>
                Show me all the dogs
            </button>
            <div>
                <select>
                    <option value="asc">Asc</option>
                    <option value="desc">Des</option>
                </select>
                {
                    allBreeds && allBreeds.map(e => 
                        <Card id={e.id} name={e.name} image={e.image} temperaments={e.temperaments} weight={e.weight} key={e.id} />
                    )
                }
            </div>
        </div>
    )
}