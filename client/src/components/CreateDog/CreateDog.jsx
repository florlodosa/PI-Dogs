import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    getTemperaments,
    postDog,
} from "../../actions";
import s from "./CreateDog.module.css";


function validate(input){
    let errors= {};
    
    if(!input.name){
        errors.name = 'Please enter a dog name'
    }
    if(!input.weight_min){
        errors.weight_min = 'Please enter a minimum weight for your dog'
    }
    if(!input.weight_max){
        errors.weight_max = 'Please enter a maximum weight for your dog'
    }
    if(!input.height_min){
        errors.height_min = 'Please enter a minimum height for your dog'
    }
    if(!input.height_max){
        errors.height_max = 'Please enter a maximum height for your dog'
    }
    
    return errors;
}

export default function CreateDog () {
    const dispach = useDispatch();
    const history = useHistory();
    
    const [errors, setErrors] = useState({});

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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
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
            <Link to='/home' className={s.link}>
                <button className={s.btn}>Go back</button>
            </Link>
            <h1 className={s.title}>Create your dog!</h1>
            <form onSubmit={e => handleSubmit(e)} className={s.form}>
                <div className={s.box}>
                    <label>Name:</label>
                    <input 
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a dog name"
                        className={s.input}
                    />
                    {errors.name && (
                        <p className={s.error}>{errors.name}</p>
                    )}
                </div>
                <div className={s.box}>
                    <label>Image:</label>
                    <input 
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={e => handleChange(e)}
                        placeholder="Insert an url"
                        className={s.input}
                    />
                </div>
                <div className={s.box}>
                    <label>Life Span:</label>
                    <input 
                        type='text'
                        value={input.life_span}
                        name='life_span'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a life span"
                        className={s.input}
                    />
                </div>
                <div className={s.box}>
                    <label>Height Min:</label>
                    <input 
                        type='number'
                        min="1"
                        max="99"
                        value={input.height_min}
                        name='height_min'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a height min"
                        className={s.input}
                    />
                    {errors.height_min && (
                        <p className={s.error}>{errors.height_min}</p>
                    )}
                </div>
                <div className={s.box}>
                    <label>Height Max:</label>
                    <input 
                        type='number'
                        min="2"
                        max="99"
                        value={input.height_max}
                        name='height_max'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a height max"
                        className={s.input}
                    />
                    {errors.height_max && (
                        <p className={s.error}>{errors.height_max}</p>
                    )}
                </div>
                <div className={s.box}>
                    <label>Weight Min:</label>
                    <input 
                        type='number'
                        min="1"
                        max="99"
                        value={input.weight_min}
                        name='weight_min'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a weight min"
                        className={s.input}
                    />
                    {errors.weight_min && (
                        <p className={s.error}>{errors.weight_min}</p>
                    )}
                </div>
                <div className={s.box}>
                    <label>Weight Max:</label>
                    <input 
                        type='number'
                        min="2"
                        max="99"
                        value={input.weight_max}
                        name='weight_max'
                        onChange={e => handleChange(e)}
                        placeholder="Insert a weight max"
                        className={s.input}
                    />
                    {errors.weight_max && (
                        <p className={s.error}>{errors.weight_max}</p>
                    )}
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
                <button type='submit' className={s.submit} disabled={errors.name}>Create</button>
            </form>
        </div>
    )
}