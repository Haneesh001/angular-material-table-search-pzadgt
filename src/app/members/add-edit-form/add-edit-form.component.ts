import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ErrorMatcherService, errorMessages } from '../../services/form-validation/form-validators.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Used for importing lists from the html.
import { countries } from '../../../server/countries-list';

import { UniqueNameService } from '../../services/unique-name.service';
import { HttpService } from 'src/app/http.service';



@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  encapsulation: ViewEncapsulation.None
})



export class AddEditFormComponent implements OnInit {

  public addEditMemberForm: FormGroup;

  public matcher = new ErrorMatcherService();
  errors = errorMessages;  // Used on form html.


  // Used on form html.
 // public org_codes = countries;
 public org_codes;
  public org_code: string;
  public  location_codes;
  public location_code:string;

  public inDatabase;


  public formErrors = {
    name: '',
    contact_person: '',
    contact_email: '',
    org_code: '',
    location_code:''
  };



  constructor(
    private fb: FormBuilder, private httpService:  HttpService,
    public uniqueNameService: UniqueNameService,
  ) {
    // Conditional that monitors testing for unique name by service.
    this.uniqueNameService.inDatabase.subscribe(result => {
      this.inDatabase = result;  // When set to true it triggers the message.
      return result === true ? this.isTaken() : null;
    });
  }

  ngOnInit() {
    this.createForm();
    // Set the initial user name validation trigger to false - no message.
    this.inDatabase = this.uniqueNameService.inDatabase.value;
    this.httpService.searchCountries(this.org_codes)
    .subscribe(org => this.org_codes = org);
    this.httpService.searchCode(this.location_codes)
    .subscribe(code => this.location_codes = code);
    
  }


  // The reactive model that is bound to the form.

  private createForm() {
    this.addEditMemberForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      contact_person: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      org_code: ['', Validators.required],
      location_code: ['', Validators.required],
    });
  }




  // Check db if email is already taken.
  // If not then this.inDatabase = false (the trigger)
  //   and isTaken() isn't called.
  // Called from input blur property on template.

  public validateUsername(contact_email) {
    return this.uniqueNameService.validateUsername(contact_email);
  }



  // This runs if inDatabase = true shows a match.  
  // See template and subscription in constructor.

  private isTaken() {

    // Remove the "already in database" message after some time.
    setTimeout (() => {
      this.inDatabase = false;

      // Clear the field to reset validation and prepare for next attempt.
      this.addEditMemberForm.controls['contact_email:']
      .setValue(null);
    }, 3000);

  }

  
}



