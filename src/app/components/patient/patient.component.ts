import { Component, OnInit } from '@angular/core';
import { FhirClient } from 'ng-fhir/FhirClient';
import { Demographics } from '../../modules/demographics.module';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  show: boolean;
  client: FhirClient;
  demographics: Demographics;
  constructor() { }
  private config: any = {
    'baseUrl': 'http://hapi.fhir.org/baseDstu3',
    'credentials': 'same-origin',
  };
  ngOnInit() {
    this.demographics = new Demographics();
    this.show = false;
   }

  findDemographics(pid: string) {
    this.show = false;
    this.demographics = new Demographics();
    if (pid.length > 0) {
      this.client = new FhirClient(this.config);
      this.client.read({type: 'Patient', id: pid }).then(response => {
        if (response.data) {
          this.demographics.lastName = response.data.name[0].family;
          this.demographics.identifier = response.data.id;
          this.demographics.firstName = response.data.name[0].given[0];
          this.demographics.address = '';
          this.demographics.gender = response.data.gender;
          this.demographics.dob = response.data.birthDate;
          this.show = true;
        }
      }, (err) => {
      console.log(err);
      });
    }
  }
}
