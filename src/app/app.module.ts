import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';
import { ProceduresComponent } from './components/procedures/procedures.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    ProceduresComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
