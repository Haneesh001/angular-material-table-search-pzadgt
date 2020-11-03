import { Component, ViewChild, Injectable} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';

import { merge, Subject, Observable } from 'rxjs';
import { startWith, switchMap, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { MemberModel } from './member.model';
import { HttpService } from '../http.service';

import { ConfirmService } from '../services/confirm-dialog/confirm.service';
import { MessagesService } from '../services/messages-service/messages.service';

import { AddMemberComponent } from './add-member/add-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
 import { countries } from '../../server/countries-list';
 import { rcodes } from '../../server/orgCode-list';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
})


export class MembersComponent {

private idColumn = 'id';
private dbTable = 'members';
private membersUrl = 'api/members';

private dsData: any;

// dataSource: MatTableDataSource<MemberModel>;
@ViewChild(MatPaginator) paginator: MatPaginator;

  public dataLength: number;

  private addMemberComponent = AddMemberComponent;
  private editMemberComponent = EditMemberComponent;

  private idArray: number[] = [];  // Create array for checkbox selection in table.
  private memberArray = [];

 public displayedColumns = [
      'select',
      'name',
      'contact_person',
      'contact_email',
      'org_code',
      'location_code',
      'options'
  ];

  public dataSource = new MatTableDataSource;


  public isSelected: boolean = false;
  // public org_codes =countries;
  public org_codes: any;
  public org_code: string;
  public organisationCode = new FormControl('');


 // public location_codes =  rcodes;
 public location_codes;
  public location_code: string;

  public LocationCode = new FormControl('');


 

  // For contact name query
  public searchTerm$ = new Subject<string>();

  constructor(
    private httpService:  HttpService,
    public dialog: MatDialog,
    private confirmService: ConfirmService,
    private messagesService: MessagesService,
    ) {


    // ------  LAST NAME SERCH -------------
  
    this.httpService.nameSearch(this.searchTerm$)
    .subscribe(data => {
        this.dataLength = data.length;
        this.dataSource.data = data;
      });
    }


  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {

      this.httpService.searchCountries(this.org_codes)
    .subscribe(org => this.org_codes = org);
    this.httpService.searchCode(this.location_codes)
    .subscribe(code => this.location_codes = code);
    }

    toggleSelectAll(event) {
      console.log(this.isSelected);
      if (event.checked == true) {
        console.log("Checked");
        // console.log("Get selected record::" + this.idArray);
  
        this.isSelected = true;
        const data = this.dataSource.data;
        console.log(data);
        //const ids = Object.keys(data);
        //var ids = data.map(person => {});
        var ids = data.map((x: any) => x.id);
        this.idArray = ids;
        console.log("test" + this.idArray);
        console.log(this.isSelected);
      } else {
        this.isSelected = false;
        console.log("unChecked");
      }
      console.log(this.isSelected);
    }


  // -------------- CRUD ----------------------


  // ----------------- GET ALL ------------------

  //  This works fine when multiple queries used.
  
  // public getAllRecords(): any {
  //   console.log("all");
  //     this.httpService.getAllRecords(this.membersUrl)
  //     .subscribe(data => {
  //       // this. dataSource = new MatTableDataSource();
  //       // this.dataSource.data = [];
  //       console.log(data);
  //       this.dataLength = data.length;
       
  //       this.dataSource.data = data;
     
  //     });
  // }
  public getAllRecords(): any {
    this.httpService.getAllRecords(this.membersUrl).subscribe(data => {
      this.dataLength = data.length;
      this.dataSource.data = data;
    });
  }

  //Multilple Delete
  removeSelectedRows = () => {
    console.log("delete");
    this.memberArray = [];
    const tempArray = [];

    const ds = this.dataSource.data;
    const property = "id";
    // this.confirmService.confirm(name, 'This action is final. Gone forever!')

    console.log("Get selected record::" + this.idArray);

    this.idArray.forEach((id, i) => {
    

      const url = `${this.membersUrl}/${id}`;

      // Call the confirm dialog component
      this.httpService.deleteRecord(url).subscribe(
        result => {
          //this.success();
          // Refresh DataTable to remove row.
          this.deleteRowDataTable(
            id,
            this.idColumn,
            this.paginator,
            this.dataSource
          );
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.messagesService.openDialog("Error", "Delete did not happen.");
        }
      );
    });
    this.idArray = [];
  };
 


  // ------------------ ADD --------------------


  public addRecord() {
    this.dialog.open(this.addMemberComponent);
  }


  // ----------- EDIT & UPDATE --------------

  public editRecord(recordId) {
    this.dialog.open(this.editMemberComponent, {
      data: {recordId: recordId, idColumn: this.idColumn, paginator: this.paginator, dataSource: this.dataSource}
    });
  }



// --------------- DELETE ------------------

  public deleteRecord(recordId) {
    const dsData = this.dataSource.data;

    // For delete confirm dialog in deleteItem to match the db column name to fetch.
   

    const url = `${this.membersUrl}/${recordId}`;

    // Call the confirm dialog component
    this.confirmService.confirm(name, 'This action is final. Gone forever!').pipe(
      switchMap(res => {if (res === true) {
        console.log('url: ', url);
        return this.httpService.deleteRecord(url);
      }}))
      .subscribe(
        result => {
          this.success();
          // Refresh DataTable to remove row.
          this.deleteRowDataTable (recordId, this.idColumn, this.paginator, this.dataSource);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.messagesService.openDialog('Error', 'Delete did not happen.');
        }
      );
  }

// Remove the deleted row from the data table. Need to remove from the downloaded data first.
  private deleteRowDataTable (recordId, idColumn, paginator, dataSource) {
    this.dsData = dataSource.data;
    const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  
 // ----------------filter------------------
 
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


  // ----------- SEARCH BY Location------------------

  public searchCountries(org_code): any {
    console.log("orgcode");

    const url = `${this.membersUrl}/?org_code=${org_code}`;
    console.log(url);

    this.httpService.searchCountries(url)
      .subscribe(data => {
        this.dataLength = data.length;
        this.dataSource.data = data;
    
        
        const countss =data;
        this.org_codes = countss;
        console.log("test" + this.org_codes);
      });
  }


 
    



  
  //----------- SEARCH BY COde ------------------

    public searchCode(location_code): any {

    const url = `${this.membersUrl}/?location_code=${location_code}`;

    this.httpService.searchCode(url)
      .subscribe(data => {
        this.dataLength = data.length;
        this.dataSource.data = data;
      });
  }

  //  ---- LAST NAME INCREMENTAL QUERY IN CONSTRUCTOR -------



  // -------------- SELECT BOX ------------------


  // Called each time a checkbox is checked in the mat table.
  public selectMember(event, selectedMember) {
    console.log(event.checked);
    console.log("selectedMember");
    // push the id's into an array then call it with the button.
    if (event.checked) {
      return this.idArray.push(selectedMember);
    } else {
      const index = this.idArray.indexOf(selectedMember);
      if (index > -1) {
        this.idArray.splice(index, 1);
      }
      return this.idArray;
    }
  }
  public getAllSelected() {
  console.log("delete");
     this.memberArray = [];
    const tempArray = [];
    const ds = this.dataSource.data;
    const property = 'id';
   // this.confirmService.confirm(name, 'This action is final. Gone forever!')

    console.log("Get selected record::" + this.idArray);

    this.idArray.forEach((id, i) => {

     // For delete confirm dialog in deleteItem to match the db column name to fetch.
   

    const url = `${this.membersUrl}/${id}`;

    // Call the confirm dialog component
     this.httpService.deleteRecord(url)
      .subscribe(
        result => {
          //this.success();
          // Refresh DataTable to remove row.
          this.deleteRowDataTable (id, this.idColumn, this.paginator, this.dataSource);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.messagesService.openDialog('Error', 'Delete did not happen.');
        }
      );
    });
    this.idArray = []; 
  }

  
 

// -----------  UTILITIES ------------------


  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error', 'No database connection.');
  }




}
