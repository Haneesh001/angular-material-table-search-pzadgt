import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/material';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {
  version = VERSION;
  constructor( ) { }

  ngOnInit() {
  }

}
