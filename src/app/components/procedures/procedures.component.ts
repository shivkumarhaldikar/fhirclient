import { Component, OnInit } from '@angular/core';
import { FhirClient } from 'ng-fhir/FhirClient';
import { ProcedureRequest } from '../../modules/procedurerequest.module';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  show: boolean;
  client: FhirClient;
  procedureRequest: ProcedureRequest [];
  private config: any = {
    'baseUrl': 'http://hapi.fhir.org/baseDstu3',
    'credentials': 'same-origin',
  };
  constructor() { }

  ngOnInit() {
    this.procedureRequest = new Array<ProcedureRequest>();
    this.show = false;
  }

  findProcedureRequest(pid: string) {
    this.show = false;
    this.procedureRequest = new Array<ProcedureRequest>();
    if (pid.length > 0) {
      this.client = new FhirClient(this.config);
      this.client.search({type: 'ProcedureRequest', subject: 'Patient%2F' + pid}).then(response => {
        if (response.data) {
          response.data.entry.forEach(e => {
            const pr = new ProcedureRequest();
            pr.code = e.resource.code.coding[0].code;
            pr.codesystem = e.resource.code.coding[0].system;
            pr.codetext = e.resource.code.coding[0].display;
            pr.status = e.resource.status;
            pr.occurancedate = e.resource.occurrenceDateTime;
            this.procedureRequest.push(pr);
            this.show = true;
        });
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

}
