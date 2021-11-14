export const API_ROOT = "http://localhost:4000";
export const SITE_NAME = ["netflix", "roulette"];
export const GENRES_LIST = ["Documentary", "Comedy", "Horror", "Crime"];
export const DEFAULT_SORT_FIELD = "vote_count";
export const SORT_TYPES = [
  {
    name: "popularity",
    value: DEFAULT_SORT_FIELD,
  },
  {
    name: "release date",
    value: "release_date",
  },
  {
    name: "rating",
    value: "vote_average",
  },
  {
    name: "name",
    value: "title",
  },
];
export const FETCH_FILMS_COUNT = 18;
export const DEFAULT_GENRE_ANY = "All";
export const EXAMPLE_FILM = {
  title: "La La Land",
  tagline: "Here's to the fools who dream.",
  vote_average: 7.9,
  vote_count: 6782,
  release_date: "2016-12-29",
  poster_path:
    "https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
  overview:
    "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
  budget: 30000000,
  revenue: 445435700,
  runtime: 128,
  genres: ["Comedy", "Drama", "Romance"],
  id: 313369,
};
export const EXAMPLE_FILM_LIST = [
  {
    id: 337167,
    title: "Fifty Shades Freed",
    tagline: "Don't miss the climax",
    vote_average: 6.1,
    vote_count: 1195,
    release_date: "2018-02-07",
    poster_path:
      "https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg",
    overview:
      "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
    budget: 55000000,
    revenue: 136906000,
    genres: ["Drama", "Romance"],
    runtime: 106,
  },
  {
    id: 269149,
    title: "Zootopia",
    tagline: "Welcome to the urban jungle.",
    vote_average: 7.7,
    vote_count: 6795,
    release_date: "2016-02-11",
    poster_path:
      "https://image.tmdb.org/t/p/w500/sM33SANp9z6rXW8Itn7NnG1GOEs.jpg",
    overview:
      "Determined to prove herself, Officer Judy Hopps, the first bunny on Zootopia's police force, jumps at the chance to crack her first case - even if it means partnering with scam-artist fox Nick Wilde to solve the mystery.",
    budget: 150000000,
    revenue: 1023784195,
    genres: ["Animation", "Adventure", "Family", "Comedy"],
    runtime: 108,
  },
  {
    id: 181808,
    title: "Star Wars: The Last Jedi",
    tagline: "The Saga Continues",
    vote_average: 7.1,
    vote_count: 4732,
    release_date: "2017-12-13",
    poster_path:
      "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
    overview:
      "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
    budget: 200000000,
    revenue: 1325937250,
    genres: ["Fantasy", "Adventure", "Science Fiction"],
    runtime: 152,
  },
];
