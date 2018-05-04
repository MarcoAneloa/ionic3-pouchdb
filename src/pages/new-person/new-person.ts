import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
/**
 * Generated class for the NewPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-person',
  templateUrl: 'new-person.html',
})
export class NewPersonPage {
  private name;
  private email;
  private phone;
  private db;
  private person;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.setupDB();
  }

  ionViewDidLoad() {
    if(this.navParams.get('person_id') != null){
      this.db.get(this.navParams.get('person_id'),(err,result)=>{
        console.log(this.navParams.get('person_id'));
        if(!err){
          this.person=result;
          this.name=result.name;
          this.email=result.email;
          this.phone=result.phone;
        }
      });
    }
  }

  setupDB(){
    PouchDB.plugin(PouchdbFind);
    PouchDB.debug.enable('pouchdb:find');
    this.db= new PouchDB('contacts');
    this.find();
  }

  save(){
    if(this.person){
      this.person.name=this.name;
      this.person.email=this.email;
      this.person.phone=this.phone;
      this.db.post(this.person,(err,result)=>{
          if(!err){
              alert('Se actualizo una persona');
              this.navCtrl.pop();
          }
        });
    }else{
      this.db.post({
        name:this.name,
        email:this.email,
        phone:this.phone},(err,result)=>{
          if(!err){
              alert('Se creo una persona');
              this.navCtrl.pop();
          }
        });
    }
  }

  cancel(){

  }

  find(){
    this.db.createIndex({
      index: {fields: ['name']}
    });
    
    this.db.find({
      selector: {name: 'Marco'},
      fields: ['_id', 'name','email','phone']
    }).then(function (result) {
      // handle result
      console.log('hola'+JSON.stringify(result));
    }).catch(function (err) {
      console.log(err);
    });
  }
}
