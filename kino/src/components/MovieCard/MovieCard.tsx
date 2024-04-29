import { Link } from "react-router-dom";
import { Card } from "antd";
import * as React from "react";
import { useState } from "react";

interface Movie {
  id: number | undefined;
  name: string;
  year: number;
  description: string;
  shortDescription: string;
  rating: {
    kp?: number | undefined;
    imdb: number;
  };
  movieLength: number;
  poster: {
    url: string;
  };
  genres: { name: string }[];
  countries: { name: string }[];
}

const MovieCard: React.FC<Movie> = ({
  id,
  name,
  year,
  description,
  shortDescription,
  rating,
  movieLength,
  poster,
  genres,
  countries,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Link to={`/movie/${id}`}>
      <Card title={name} onClick={toggleDescription}>
        <img
          src={poster.url}
          alt={name}
          style={{ width: "100%", maxWidth: "200px", height: "auto" }}
        />
        <p>{showFullDescription ? description : shortDescription}</p>
        {!showFullDescription && (
          <>
            <p>
              <strong>Жанр:</strong>{" "}
              {genres.map((genre) => genre.name).join(", ")}
            </p>
            <p>
              <strong>Страна:</strong>{" "}
              {countries.map((country) => country.name).join(", ")}
            </p>
            <p>
              <strong>Год:</strong> {year}
            </p>

            <p>
              <strong>Рейтинг IMDB:</strong> {rating.imdb}
            </p>
            <p>
              <strong>Продолжительность:</strong> {movieLength} мин
            </p>
          </>
        )}
      </Card>
    </Link>
  );
};

export default MovieCard;
