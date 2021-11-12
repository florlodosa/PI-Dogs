import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    getTemperaments,
    postDog,
} from "../../actions";
import s from "./CreateDog.module.css";

export default function CreateDog () {
    const dispach = useDispatch();
    const history = useHistory();
    //metodo del router-dom que lo que hace es redirigirme a la ruta que le diga


    const [input, setInput] = useState(
        {
            name: "",
            image: "",
            life_span: "",
            weight_min: "",
            weight_max: "",
            height_min: "",
            height_max: "",
            temperaments: [],
        }
    )

    useEffect(() => {
        dispach(getTemperaments());
    }, [dispach]);

    const temperaments = useSelector((state) => state.temperaments);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value],
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispach(postDog(input));
        alert('Your Dog was created!');
        setInput({
            name: "",
            image: "",
            life_span: "",
            weight_min: "",
            weight_max: "",
            height_min: "",
            height_max: "",
            temperaments: [],
        })
        history.push('/home');
    }


    return (
        <div className={s.container}>
            <Link to='/home'>
                <button>Go back</button>
            </Link>
            <h1>Create your dog!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a dog name"
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={e => handleChange(e)}
                        placeholder="Insert an url"
                    />
                </div>
                <div>
                    <label>Life Span:</label>
                    <input 
                        type='text'
                        value={input.life_span}
                        name='life_span'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a life span"
                    />
                </div>
                <div>
                    <label>Height Min:</label>
                    <input 
                        type='number'
                        min="1"
                        max="99"
                        value={input.height_min}
                        name='height_min'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a height minimum"
                    />
                </div>
                <div>
                    <label>Height Max:</label>
                    <input 
                        type='number'
                        min="2"
                        max="99"
                        value={input.height_max}
                        name='height_max'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a height maximum"
                    />
                </div>
                <div>
                    <label>Weight Min:</label>
                    <input 
                        type='number'
                        min="1"
                        max="99"
                        value={input.weight_min}
                        name='weight_min'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a weight minimum"
                    />
                </div>
                <div>
                    <label>Weight Max:</label>
                    <input 
                        type='number'
                        min="2"
                        max="99"
                        value={input.weight_max}
                        name='weight_max'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a weight maximum"
                    />
                </div>
                <select onChange={ e => handleSelect(e)}>
                    <option selected="false" disabled>
                        Select your Temperaments
                    </option>
                    {temperaments.map(e => (
                        <option value={e.name}>{e.name}</option>
                    ))}
                </select>
                <ul>
                        {input.temperaments.map(e => <li>{e}</li>)}
                </ul>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}