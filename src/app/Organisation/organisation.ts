import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/material';
console.log("at start");
@Component({
  selector: 'org-details',
  templateUrl: './organisation.html',

 
})
export class OrganisationComponent implements OnInit {
  version = VERSION;
  constructor( ) { }

  ngOnInit() {
  }


}
console.log("at end");