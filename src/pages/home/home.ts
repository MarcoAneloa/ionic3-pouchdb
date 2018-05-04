import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import PouchDB from "pouchdb"
import {NewPersonPage} from '../new-person/new-person';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private persons;
  private db;

  constructor(public navCtrl: NavController,public navParams:NavParams) {
  }

  ionViewDidEnter(){
    this.refresh();
  }

  refresh(){
    this.db= new PouchDB('contacts');
    this.persons=[];
    this.db.allDocs({include_docs:true},(err,result)=>{
      if(!err){
        let rows=result.rows;
        for(let i=0;i<rows.length;i++){
          this.persons.push(rows[i].doc);
        }
      }
    })
    //this.persons.push({name:'Marco Aneloa',email:'thhrthrhhthr',phone:'768767687'});
  }

  createNew(){
    this.navCtrl.push(NewPersonPage);
  }

  delete(person){
    if(confirm('Estas Seguro..')){
      this.db.remove(person,(err,result)=>{
        if(!err){
          alert('Persona Eliminada');
          this.refresh();
        }
      })
    }
  }
  edit(person){
    this.navCtrl.push(NewPersonPage,{
      person_id: person._id
    });
  }
}
