import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { devEnvironment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor() {}

  getBaseUrl(): string {
    return !devEnvironment.production // if we are in dev mode, change if production
      ? devEnvironment.apiUrl
      : environment.apiUrl;
  }
}
