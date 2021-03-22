import React,{useEffect, useState} from 'react';
import './Search.scss'
import _ from 'lodash';
import FilmList from '../FilmList/FilmList';
 
function Search() {

    const [filmsSortBy,setFilmsSortBy] = useState('');
    const [popularFilm, setPopularFilm] = useState([]);


const callFilmPopular = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fd686ababf68788e8d87639cef87259e&language=it-IT');
    const json = await response.json();
    
    setPopularFilm([json]);
}

const handlesetFilm = (e) => {
    setFilmsSortBy(e.target.value)
}

useEffect(() => {
    callFilmPopular()
},[])


return (
    <div className="Search">
    <div className="container p-5">
        <div className="row">
            <div className="col-xl-8">
                Ordina per:
                <select onChange={event => handlesetFilm(event)} className="form-control">
                    <option selected value="null"></option>
                    <option value="vote_average">Voto</option>
                    <option value="release_date">Data di rilascio</option>
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
            <hr/>
            <div className="row">
                    <h1>Film Popolari</h1>
                </div>
                <FilmList film={popularFilm} sorted={filmsSortBy}/>
            </div>
        </div>
    </div>
</div>
)

}

export default Search;