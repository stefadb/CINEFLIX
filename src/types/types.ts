import { z } from "zod";

export const MovieSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  Poster: z.string(),
});

export type Movie = z.infer<typeof MovieSchema>;

export interface SavedMovie {
    movie: Movie,
    vote?: 1 | 2 | 3 | 4 | 5
};

const Rating = z.object({
  Source: z.string(),
  Value: z.string(),
});

export const MovieDetailsSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  Rated: z.string().optional(),
  Released: z.string().optional(),
  Runtime: z.string().optional(),
  Genre: z.string().optional(),
  Director: z.string().optional(),
  Writer: z.string().optional(),
  Actors: z.string().optional(),
  Plot: z.string().optional(),
  Language: z.string().optional(),
  Country: z.string().optional(),
  Awards: z.string().optional(),
  Poster: z.string(),
  Ratings: z.array(Rating),
  Metascore: z.string().optional(),
  imdbRating: z.string().optional(),
  imdbVotes: z.string().optional(),
  imdbID: z.string(),
  Type: z.string(),
  DVD: z.string().optional(),
  BoxOffice: z.string().optional(),
  Production: z.string().optional(),
  Website: z.string().optional()
});

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;