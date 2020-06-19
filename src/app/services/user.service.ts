import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  constructor(
    public fireStore: AngularFirestore
  ) {
    this.usersCollection = fireStore.collection<User>('users');
    this.user = this.usersCollection.valueChanges();
  }

  query() {
    return this.fireStore.collection('users').snapshotChanges();
  }

}
