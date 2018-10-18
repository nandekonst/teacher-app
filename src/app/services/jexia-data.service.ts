import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Dataset } from 'jexia-sdk-js/api/dataops/dataset';
import { DataOperations } from '@jexia/ng-jexia';
import { field } from 'jexia-sdk-js/api/dataops/filteringApi';
import { ITeacher } from '../interfaces/ITeacher';
import { Observable, BehaviorSubject, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JexiaDataService {
  //create a property from type Dataset with ITeacher interface and set it dataset teachers
  teacherdataset: Dataset<ITeacher> = this.dataOperations.dataset<ITeacher>('teachers');

  //select it and execute it 
  teachers: Promise<ITeacher[]> = this.teacherdataset.select().execute();
  //initalize behaviorsubject
  teacherSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  //subscribe to the current Message
  currentMessage: Observable<ITeacher> = this.teacherSource.asObservable();


  constructor(public dataOperations: DataOperations) {   }

 
 fetchNearestTeachers(teacherobj: any[]):  Promise<Array<any>>{
   let filterCondition = field("location").isEqualTo(teacherobj)
   return this.teacherdataset.select().where(filterCondition).execute()
 }

 updateTeachers(teacherobj: any): void {
  let filterCondition = field("location").isEqualTo(teacherobj.city)
  let filteredTeachers = this.teacherdataset.select().where(filterCondition).execute().then(data => {
    //send out the messagestream
    this.teacherSource.next(data)
  });



 }



 filterRecords(teacherobj: any) {
   let filterCondition = field("location").isEqualTo(teacherobj.location)
   this.teacherdataset.select().where(filterCondition).execute().then((data) => {

   })
 }

}
