import {Component, inject} from '@angular/core';
import {MovieService} from './shared/services/movie.service';
import {map} from 'rxjs';
import {NgForOf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    NgOptimizedImage
  ],
  styleUrl: './app.css'
})
export class App {
  // Properties
  public movies: any; // TODO: Should be typed as MovieModel, or the like.
  protected movieService: MovieService = inject(MovieService);

  searchMovies(keyword: string) {
    // *************************
    // Workshop: refactor this call, so the architecture/structure is better.
    // *************************
    this.movieService.searchMovies(keyword)
      .pipe(
        map((movies: any) => movies.Search) // Q: WHY do we map out movies.Search here??
      )
      .subscribe({
        next: movieData => this.movies = movieData,				// 1. success handler,
        error: err => console.log(err),						// 2. error handler
        complete: () => console.log('Getting movies complete...')	// 3. complete handler
      })
  }
}
