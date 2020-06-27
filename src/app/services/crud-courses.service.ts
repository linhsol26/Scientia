import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Courses } from '../model/courses.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudCoursesService {
  endpoint = 'http://localhost:3000/';
  public courseRef: AngularFirestoreCollection<Courses>;
  public courses: Observable<Courses[]>;
  // datas = [
  //   {
  //     title: 'Operating System',
  //     // tslint:disable-next-line:max-line-length
  //     desc: 'Example Algorithm with multi I/O ... :(( Please WORKKKKKKKKKKKKKKKKK :((',
  //     action: '',
  //     pic: '../../../assets/system.svg',
  //     course: 'lthdh',
  //     content: [
  //       {
  //         name: 'FCFS',
  //         // tslint:disable-next-line:max-line-length
  //         inf: ''
  //       },
  //       {
  //         name: 'SJF',
  //         inf: 'Sometime it work and sometime isnt work'
  //       },
  //       {
  //         name: 'Round Robin',
  //         inf: 'Something'
  //       },
  //       {
  //         name: 'SRTF',
  //         inf: 'Hope it gonna run WELL:)'
  //       }
  //     ]
  //   },

  datas: Array<any> = [];
  index: any; // lthdh
  content: any;
  constructor(
    private afAuth: AngularFireAuth,
    public http: HttpClient,
    public db: AngularFirestore
  ) {
    this.getCourse();
  }

  getIndex(course) {
    this.index = course;
    return this.index;
  }

  getCourse() {
    this.db.collection('courses').snapshotChanges().subscribe(v => {
        this.datas = v.map(i => {
          const data = i.payload.doc.data() as Courses;
          const key = i.payload.doc.id;
          return {key, ...data};
        });
      }
    );
  }

  getContent() {
    this.datas.forEach(async element => {
      if (element.course === this.index) {
        this.content = element.content;
      }
    });
    return this.content;
  }

  async createCourse(course: Courses) {
    this.http.post(this.endpoint + 'courses/createCourse', {
      title: course.title,
      desc: course.desc,
      content: course.content,
      course: course.course,
      pic: '../../../assets/system.svg',
      ownerId: (await this.afAuth.currentUser).uid
    }).subscribe((res) => {
      console.log(res);
    });
    location.href = 'home';
  }

  async updateCourse(id, course: Courses) {
    this.http.post(this.endpoint + 'courses/updateCourse', {
      key: id,
      uid: (await this.afAuth.currentUser).uid,
      title: course.title,
      desc: course.desc,
      content: course.content
    }).subscribe();
  }

  async deleteCourse(course: Courses) {
    this.http.post(this.endpoint + 'courses/deleteCourse', {
      uid: (await this.afAuth.currentUser).uid,
      key: course.key
    }).subscribe();
  }

}
