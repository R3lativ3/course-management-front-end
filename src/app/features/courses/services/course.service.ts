import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../core/services/base-api.service';
import Course from '../models/Course';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private urlEndpoint: string;
  private endpoint = '/course';

  constructor(
    private http: HttpClient,
    private baseApiService: BaseApiService,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.urlEndpoint = this.baseApiService.getBaseUrl() + this.endpoint;
  }

  /**
   * Retrieves all courses.
   *
   * @returns An observable that resolves with an array of Course objects.
   */
  getAll(): Observable<Course[]> {
    return this.http
      .get<Course[]>(this.urlEndpoint)
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }

  /**
   * Retrieves a course by its id.
   *
   * @param id the id of the course to retrieve
   *
   * @returns An observable that resolves with the Course object if found,
   *          or null if not found.
   */
  getById(id: number): Observable<Course | null> {
    return this.http
      .get<Course>(`${this.urlEndpoint}/${id}`)
      .pipe(catchError((error) => this.errorHandlerService.handleError(error)));
  }
}
