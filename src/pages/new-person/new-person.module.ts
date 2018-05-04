import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPersonPage } from './new-person';

@NgModule({
  declarations: [
    NewPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPersonPage),
  ],
})
export class NewPersonPageModule {}
