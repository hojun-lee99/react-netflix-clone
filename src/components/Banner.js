import React, { useEffect, useState } from 'react';
import instance from '../api/axios';
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보 가져오기(여러 영화)
    const request = await instance.get(requests.fetchNowPlaying);
    // 여러 영화 중 하나의 ID를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;
    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await instance.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className="banner_contents">
          {/** Title */}
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            {/** video가 있을 경우에만 play 버튼 생성 */}
            {movie &&
            movie.videos &&
            Array.isArray(movie.videos.results) &&
            movie.videos.results.length !== 0 ? (
              <button
                className="banner_button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            ) : null}
            <button className="banner_button info">
              <div className="space"></div> More Information
            </button>
          </div>
          {/** DIV > 2 BUTTONS */}
          <h1 className="banner_description">
            {truncate(movie?.overview, 100)}
          </h1>
          {/* Description */}
        </div>
        <div className="banner-fadeBottom" />
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=1&autoplay=1&loop=1&mute=0&playlist=${movie.videos.results[0].key}`}
            width="640"
            height="360"
            allow="autoplay; fullscreen"
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
};

// styledContainer
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Banner;
