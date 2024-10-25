import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

const DeatailPage = () => {
  let { movieId } = useParams();
  const [movies, setMovies] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
      );
      setMovies(request.data);
    }
    fetchData();
  }, [movieId]);

  if (!movies) return null;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
        alt="modal__poster-img"
      />
    </section>
  );
};

export default DeatailPage;
