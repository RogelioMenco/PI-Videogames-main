import { Link } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import './Card.css';

function Card({ data }) {
  return (
    <div className="card">
      <Link to={`/videogames/${data.id}`}>
        {data.image === null || !data.image ? (
          <NotFound image={'noimage'} />
        ) : (
          <img className="img" src={data.image} alt={data.name} />
        )}
      </Link>
      <div className="textCard">
        <div className="nameGenres">
          <span className="name">{data.name}</span>
          <span className="genres">{data.genres}</span>
        </div>
        <div className="divRatingWrapper">
          <div className="divRating">
            <div className="rating">{data.rating}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
