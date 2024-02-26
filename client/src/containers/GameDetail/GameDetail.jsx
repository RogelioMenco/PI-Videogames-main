import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameById } from '../../actions/index';
import NotFound from '../../components/NotFound/NotFound';
import './GameDetail.css';

function GameDetail({ id }) {
  const dispatch = useDispatch();
  const videogame = useSelector((store) => store.searchVideogameById);

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore((showMore) => !showMore);
  };

  useEffect(() => {
    dispatch(getVideogameById(id));
  }, [dispatch, id]);

  const gameDescription = showMore
    ? videogame.description
    : `${videogame.description?.slice(0, 750)}...`;

  return (
    <div className="full">
      <div
        className="overlay"
        style={{
          backgroundImage: `url('${videogame.image}')`,
        }}
      />
      <div className="contentWrapper">
        <div className="backButtonWrapper">
          <Link to="/home">
            <button className="button backButton" type="submit">
              🡸 Volver
            </button>
          </Link>
        </div>

        <div className="gameContainer">
          <div className="image">
            {videogame.image === null || !videogame.image ? (
              <NotFound image={'noimage'} />
            ) : (
              <img
                src={videogame.image}
                alt={videogame.name}
                className="gameImage"
              />
            )}
          </div>

          <div className="detailsContainer">
            <h1>{videogame.name}</h1>

            <div className="subtitleData">
              <h4>({videogame.released})</h4>
              <h4>{videogame.genres}</h4>
              <h4>
                {videogame.rating} <span className="star"> ★</span>
              </h4>
            </div>

            <div className="descriptionContainer">
              <p>
                {gameDescription}
                {!showMore && (
                  <span onClick={handleShowMore} className="seeMoreToggle">
                    {' '}
                    Ver mas
                  </span>
                )}
              </p>
              {showMore && (
                <span onClick={handleShowMore} className="seeMoreToggle">
                  Ver menos
                </span>
              )}
            </div>

            <p>
              <span className="categoryLabel">Plataformas:</span>
              {videogame.platforms}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
