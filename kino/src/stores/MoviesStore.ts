import { makeAutoObservable, runInAction } from "mobx";

interface Movie {
  id: number;
  name: string;
  year: number;
  description: string;
  shortDescription: string;
  rating: {
    kp?: number;
    imdb?: number;
  };
  movieLength: number;
  poster: {
    url: string;
  };
  genres: { name: string }[];
  countries: { name: string }[];
}

class MoviesStore {
  movies: Movie[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchMovies = async () => {
    this.isLoading = true;
    try {
      const response = await fetch(
        "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=100&selectFields=id&selectFields=name&selectFields=description&selectFields=shortDescription&selectFields=year&selectFields=rating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=similarMovies",
        {
          headers: {
            accept: "application/json",
            "X-API-KEY": "H911DE0-18AMGF7-KZ71HF3-KYXCQPY",
          },
        }
      );
      const data = await response.json();

      console.log(data, "MOV");

      runInAction(() => {
        this.movies = data.docs || [];
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
      console.error("Error fetching movies:", error);
    }
  };
}

export const moviesStore = new MoviesStore();
