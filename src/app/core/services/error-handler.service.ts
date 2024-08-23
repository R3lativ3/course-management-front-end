import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  /**
   * Handles HTTP errors, logging a user-friendly error message to the console and
   * re-throwing the error as an observable.
   *
   * This function is intended to be used as a catch handler for HTTP requests.
   *
   * @param error the error to be handled
   * @returns an observable that throws an error with the user-friendly error message
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    const wasClientSideError = error.error instanceof ErrorEvent;

    const errorMessage = wasClientSideError
      ? `Client-side error: ${error.error.message}`
      : `Backend returned Code: ${error.status}\nMessage: ${error.error}`;

    console.error(errorMessage);
    console.error('Full error object: ', error);

    return throwError(() => new Error(errorMessage));
  }
}
