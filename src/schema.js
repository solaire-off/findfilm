import * as Yup from "yup";

export const FilmSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "The minimum length of the title is 2 characters.")
    .required("Required field."),
  vote_average: Yup.number()
    .nullable()
    .typeError("Rating is required number.")
    .min(1, "The minimum rating of the film is 1.")
    .max(10, "The maximum rating of the film is 10."),
  release_date: Yup.date().nullable().default(null),
  poster_path: Yup.string()
    .url("Movie url must be a valid url.")
    .required("Required field."),
  overview: Yup.string()
    .min(10, "Minimum length of the overview is 10 characters.")
    .required("Required field."),
  runtime: Yup.number()
    .typeError("Runtime must be a number.")
    .min(1, "Minimum length of runtime is 1 minute.")
    .required("Required field."),
  genres: Yup.array().min(1, "At least one genre is required"),
});
