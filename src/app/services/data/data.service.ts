import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private event = new BehaviorSubject(false);
  currentEvent = this.event.asObservable();

  constructor() { }

  changeEvent(event: boolean) {
    this.event.next(event);
  }
}
