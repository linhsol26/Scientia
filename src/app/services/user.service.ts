import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Array<any> = [];
  constructor(
    public fireStore: AngularFirestore
  ) {
    this.query();
  }

  query() {
    return this.fireStore.collection('users').snapshotChanges().subscribe(v => {
      this.user = v.map(i => {
        return {
          index: v.indexOf(i),
          id: i.payload.doc.id,
          ...(i.payload.doc.data() as User)
        };
      });
    });
  }

}
