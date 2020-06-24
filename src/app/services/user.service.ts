import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Array<any> = [];
  constructor(
    public fireStore: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.query();
  }

  query() {
    return this.fireStore.collection('users').snapshotChanges().subscribe(v => {
      this.user = v.map(i => {
        return {
          index: v.indexOf(i),
          id: i.payload.doc.id,
          action: null,
          ...(i.payload.doc.data() as User)
        };
      });
    });
  }

  async delete(id) {
    const currentUser = (await this.afAuth.currentUser);
    if (id !== currentUser.uid) {
      await this.fireStore.collection('users').doc(id).delete();
      this.afAuth.user.subscribe(i => {
        if (i.uid === id) {
          i.delete();
        }
      });
    }
  }

  async update(id, name, password) {
    const currentUser = (await this.afAuth.currentUser);
    if (id !== currentUser.uid) {
      await this.fireStore.collection('user').doc(id).update({
        displayName: name
      });
      (await this.afAuth.currentUser).updatePassword(password);
    }
  }
}
