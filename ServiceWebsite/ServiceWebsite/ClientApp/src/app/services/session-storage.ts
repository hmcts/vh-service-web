import { Injectable } from '@angular/core';
import { StorageBase } from './storage-base';

@Injectable()
export class SessionStorage extends StorageBase {
    constructor() {
        super(window.sessionStorage, 'SessionStorage');
    }
}
