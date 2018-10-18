import { Component, OnInit } from '@angular/core';
import { JexiaDataService } from '../services/jexia-data.service';
import { ITeacher } from '../interfaces/ITeacher';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  teachersArray:ITeacher[];
  filteredRecords: ITeacher[];
  location: Object;
  currentTeachers: ITeacher;

  constructor(private jexiaDataService: JexiaDataService, private storage: Storage) {}

  ngOnInit(){
    this.showNearestTeacher();
    this.showAllTeachers();
  
  }

  showAllTeachers(){
    this.jexiaDataService.teachers.then(data => {
      this.teachersArray = data;
    })
  }

  showNearestTeacher(){
    this.jexiaDataService.currentMessage.subscribe(message => this.currentTeachers = message)

    //check if there is a value in local storage
    this.storage.get('location').then((val) => {
      if(val != undefined){
        this.location = JSON.parse(val);
        this.jexiaDataService.updateTeachers(this.location)

      } else {
        //take current location from phone;
        //checkout Geolocation
        
      }

     

    })
  }

  
}
