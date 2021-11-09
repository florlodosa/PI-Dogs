import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getBreeds,
    getTemperaments,
    filterBreedsByTemperaments,
    filterBreedsByExistence, 
    orderByName,
    orderByWeigth,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import s from "./Home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const allBreeds = useSelector((state) => state.breeds)
    //useSelector<3 trae todo lo que esta en el estado de breeds(mas facil que hacer el mapstate to props)
    const [, setRender] = useState("");
    //para que al setear la pag, se modifique el estado local y se renderize
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
        setCurrentPage(1);
        setRender(e.target.value);
    }

    function handleFilterByExistence(e){
        e.preventDefault();
        dispatch(filterBreedsByExistence(e.target.value));
        setCurrentPage(1);
        setRender(e.target.value);
    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setRender(e.target.value);
    }

    function handleOrderByWeigth(e){
        e.preventDefault();
        dispatch(orderByWeigth(e.target.value));
        setCurrentPage(1);
        setRender(e.target.value);
    }

    return (
        <div>
            <Link to='/dog'>Create new Recipe</Link>
            <h1 className={s.titleHome}>Dogs</h1>
            <SearchBar />
            <button onClick={e => {handleClick(e)}}>
                Show me all the dogs
            </button>
            <div>
                <select onChange={e => handleOrderByName(e)}>
                    <option selected="false" disabled >
                        Order by Alphabet
                    </option>
                    <option value="asc">Aa-Zz</option>
                    <option value="desc">Zz-Aa</option>
                </select>
                <select onChange={e => handleOrderByWeigth(e)}>
                    <option selected="false" disabled >
                        Order by Weight
                    </option>
                    <option value="0to1">Low to High</option>
                    <option value="1to0">High to Low</option>
                </select>
                <select onChange={e => handleFilterByExistence(e)}>
                    <option selected="false" disabled >
                        Filter by Existence
                    </option>
                    <option value="All">All</option>
                    <option value="Created">Created</option>
                    <option value="Existent">Existent</option>
                </select>
                <select onChange={e => handleFilterByTemperaments(e)}>
                    <option selected="false" disabled >
                        Filter by Temperaments
                    </option>
                    <option value='All' >
                        All
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