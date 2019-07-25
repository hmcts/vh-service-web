import { Injectable } from '@angular/core';
import { ApiClient, TokenResponse, ParticipantResponse } from '../../../services/clients/api-client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoWebService {

  constructor(private apiClient: ApiClient) {
  }

  getToken(participantId: string): Observable<TokenResponse> {
    return this.apiClient.getToken(participantId);
  }

  getCurrentParticipantId(): Observable<ParticipantResponse> {
    return this.apiClient.getCurrentParticipant();
  }

  getTestCallScore(participantId: string): Observable<string> {
    return (of('Okay'));
    // return this.apiClient.getTestCallResult(participantId);
  }

}
