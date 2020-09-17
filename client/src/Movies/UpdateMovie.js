import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://locahost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        setMovie(res.data);
      })
      .catch(err => {
        console.log('Error: ', err);
      })
  }, [id])

  const handleSubmit = e =>  {
    e.preventDefault();
    
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res);
        history.push(`/movies/${id}`)
      })
      .catch(err => ('Error: ', err))
      .finally(() => {
        props.handleRefresh();
      })
  }

  const handleChange = e => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'metascore') {
      value = parseInt(value,10);
    }
    if  (name === 'stars') {
      value = value.split(',');
    }

    setMovie({
      ...movie,
      [name]: value
    });
  }

  return (
    <div className='update-movie'>
      <h3>Update this Movie</h3>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input 
          type='text'
          name='title'
          placeholder='title'
          value={movie.title}
          onChange={handleChange}
        />
        <label>Director: </label>
        <input 
          type='text'
          name='director'
          placeholder='director'
          value={movie.director}
          onChange={handleChange}
        />
        <label>Metascore: </label>
        <input 
          type='number'
          name='metascore'
          placeholder='metascore'
          value={movie.metascore}
          onChange={handleChange}
        />
        <label>Stars: </label>
        <input 
          type='text'
          name='stars'
          placeholder='stars'
          value={movie.stars}
          onChange={handleChange}
        />

        <button>Update Movie</button>
      </form>
    </div>
  )
}

export default UpdateMovie;