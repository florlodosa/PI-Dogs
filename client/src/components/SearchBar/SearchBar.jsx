import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedsByName } from "../../actions";
import s from './SearchBar.module.css'

export default function SearchBar(){
    const dispach = useDispatch();
    const [name, setName] = useState("");

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispach(getBreedsByName(name));
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={e => handleInput(e) }
                className={s.input}
            />
            <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}
