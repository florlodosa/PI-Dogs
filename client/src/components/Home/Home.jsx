import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, getTemperaments, filterBreedsByTemperaments } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import s from "./Home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const allBreeds = useSelector((state) => state.breeds)
    //useSelector<3 trae todo lo que esta en el estado de breeds(mas facil que hacer el mapstate to props)
    const [currentPage, setCurrentPage] = useState(1);
    //estado local 
    const [breedsPerPage] = useState(8); 
    //estado local 
    const indexOfLastBreed = currentPage * breedsPerPage;
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
    const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed)
    //las breeds que estan en la pag actual
    //allbreeds es el arreglo del estado que viene del reducer

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect( () => {
        dispatch(getBreeds());
        //use dispach es como hacer el dispach to props
    }, [dispatch])
    //useEffect trae del state las breeds cuando el component se monta

    function handleClick(e){
        e.preventDefault();
        dispatch(getBreeds());
    }

    const allTemperaments = useSelector((state) => state.temperaments);
    //para el select de temps

    //Para disparar la accion getTemperament(), y llenar el estado con los temperamentos
    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);
    
    function handleFilterByTemperaments(e){
        e.preventDefault();
        dispatch(filterBreedsByTemperaments(e.target.value));
    }

    return (
        <div>
            <Link to='/dog'>Create new Recipe</Link>
            <h1 className={s.titleHome}>Dogs</h1>
            <button onClick={e => {handleClick(e)}}>
                Show me all the dogs
            </button>
            <div>
                <select>
                    <option value="asc">Asc</option>
                    <option value="desc">Des</option>
                </select>
                <select>
                    <option value="breedtypes">B1</option>
                    <option value="breedtypes">B2</option>
                </select>
                <select onChange={e => handleFilterByTemperaments(e)}>
                    <option selected="false" disabled >
                        Filter by Temperaments
                    </option>
                    {
                        allTemperaments?.map((e) => (
                            <option key={e.id} value={e.name} >{e.name}</option>
                        ))
                    }
                </select> 
                <ul className={s.dogGrid}>
                {
                    currentBreeds && currentBreeds.map(e => 
                        <Card id={e.id} name={e.name} image={e.image} temperaments={e.temperaments} weight={e.weight} key={e.id} />
                    )
                }
                </ul>

                <Pagination
                    breedsPerPage={breedsPerPage}
                    allBreeds={allBreeds.length}
                    pagination={pagination}
                />

            </div>
        </div>
    )
}