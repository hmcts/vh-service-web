import { Injectable } from '@angular/core';
import { ApiClient, TokenResponse} from '../../../services/clients/api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoWebService {

  constructor(private apiClient: ApiClient) {
  }

  getToken(participantId: string): Observable<TokenResponse> {
    return this.apiClient.getToken(participantId);
  }
}
