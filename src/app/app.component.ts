import { Component, ViewChild } from '@angular/core';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { PatientComponent } from './components/patient/patient.component';
import { ProceduresComponent } from './components/procedures/procedures.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'app';
  pid: string;
  @ViewChild(PatientComponent) pc: PatientComponent;
  @ViewChild(ProceduresComponent) pr: ProceduresComponent;

  OnInit() {

  }

  find(pid: string) {
    this.pc.findDemographics(pid);
    this.pr.findProcedureRequest(pid);
  }
}


