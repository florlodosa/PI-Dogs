import React from "react";
import s from './Pagination.module.css';

export default function Pagination ({breedsPerPage, allBreeds, pagination}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allBreeds/breedsPerPage); i++) {
        pageNumber.push(i);
    };

        return(
            <nav>
                <div className={s.pagination}>
                    {pageNumber && pageNumber.map(pageNum => (
                        <div className={s.pageNum} key={pageNum}>
                            <button  className={s.btn} onClick={() => pagination(pageNum)}>{pageNum}</button>
                        </div>
                    ))}
                </div>
            </nav>
        );

}