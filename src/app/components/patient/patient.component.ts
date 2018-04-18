import { Component, OnInit } from '@angular/core';
import { FhirClient } from 'ng-fhir/FhirClient';
import { Patient } from '../../modules/patient.module';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  client: FhirClient;
  patient: Patient;
  constructor() { }
  private config: any = {
    'baseUrl': 'http://hapi.fhir.org/baseDstu3',
    'credentials': 'same-origin',
  };
  ngOnInit() {
    this.patient = new Patient();
    this.client = new FhirClient(this.config);
    this.client.read({type: 'Patient', id: '717891'}).then(response => {
      if (response.data) {
         this.patient.lastName = response.data.name[0].family;
         this.patient.identifier = response.data.id;
         this.patient.firstName = '';
         this.patient.address = '';
      }
    }, (err) => {
      console.log(err);
    });
  //  console.log(this.patient);
  }

  stringify(obj: any): string {
    return JSON.stringify(obj, null, '  ');
  }
}
