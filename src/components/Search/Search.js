import React,{useEffect, useState} from 'react';
import './Search.scss'

function Search() {

    const [film, setFilm] = useState('');
    const [filmList, setFilmList] = useState([]);
    const [error, setError] = useState('');
    
    const [popularFilm, setPopularFilm] = useState([]);

  const callFilmApi = async (movie) => {
    if(film){
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=fd686ababf68788e8d87639cef87259e&language=it-IT&query=${movie}`)
        const json = await response.json();
        setFilmList([json]);
    } else {
        setError('Devi inserire un titolo per poter procedere con la ricerca');
    }
};

const callFilmPopular = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fd686ababf68788e8d87639cef87259e&language=it-IT');
    const json = await response.json();
    setPopularFilm([json]);
    console.log(popularFilm)
}

const handlesetFilm = (e) => {
    setFilm(e.target.value)
}

useEffect(() => {
    callFilmPopular()
    console.log(filmList)
},[])



return (
    <div className="Search">
    <div className="container p-5">
        <div className="row">
            <div className="col-xl-8">
                <input type="text" name={'film'} className="form-control" onChange={event => handlesetFilm(event)}/>
                <small className="error">{error}</small>
            </div>
            <div className="col-xl-4">
                <button onClick={() => callFilmApi(film)} className="btn btn-primary" type="submit">Search</button>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
            <hr/>
            <div className="row">
                    {filmList.length == 0 || film == '' ? <h1>Film Popolari</h1> : <h1>Stai cercando: "{film}"</h1>}
                </div>
            <div className="d-flex justify-content-around flex-row flex-wrap">
                {filmList.length == 0 || film == '' ? popularFilm.map(
                    x => x.results.map((y,index) =>
                            <div key={y.id} className="card mb-3" style={{width: "18rem"}}>
                                <img src={`https://image.tmdb.org/t/p/w342/${y.poster_path}`} alt={y.title} className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title">{y.title}</h5>
                                    <p className="card-text">{y.overview.substring(0, 150) + '...'}</p>
                                </div>
                            </div>
                )) : 
                filmList.map(
                    x => x.results.map((y,index) =>
                            <div key={y.id} className="card mb-3" style={{width: "18rem"}}>
                                <img src={`https://image.tmdb.org/t/p/w342/${y.poster_path}`} alt={y.title} className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title">{y.title}</h5>
                                    <p className="card-text">{y.overview.substring(0, 150) + '...'}</p>
                                </div>
                            </div>
                ))}
                </div>           
            </div>
        </div>
    </div>
</div>
)

}

export default Search;