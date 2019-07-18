import { Injectable, } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ParticipantService {

  getCurrentParticipantId() {
    return Promise.resolve('b4e1c447-0e97-4bfd-b1d8-006dd28d8428');
  }
}
