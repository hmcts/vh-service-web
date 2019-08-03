import { Injectable } from '@angular/core';
import {
  ApiClient,
  TokenResponse,
  ParticipantResponse,
  TestCallScoreResponse
} from '../../../services/clients/api-client';
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

  getCurrentParticipantId(): Observable<ParticipantResponse> {
    return this.apiClient.getCurrentParticipant();
  }

  getTestCallScore(participantId: string): Observable<TestCallScoreResponse> {
    return this.apiClient.getTestCallResult(participantId);
  }
}
