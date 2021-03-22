import React,{useEffect, useState} from 'react';
import './FilmList.scss'
import _ from 'lodash';

const FilmList = (props) => {
    return(
        <div className="d-flex justify-content-around flex-row flex-wrap">
        {props.film.map(
            x => _.orderBy(x.results, [props.sorted],['desc']).map((y,index) =>
                    <div key={y.id} className="card mb-3" style={{width: "18rem"}}>
                        <img src={`https://image.tmdb.org/t/p/w342/${y.poster_path}`} alt={y.title} className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">{y.title}</h5>
                            <p className="card-text">{y.overview.substring(0, 150) + '...'}</p>
                            <p className="small-data">Voto: {y.vote_average}</p>
                            <p className="small-data">Data di rilascio: {y.release_date}</p>
                        </div>
                    </div>
        )) }
        </div> 
    )
}

export default FilmList;