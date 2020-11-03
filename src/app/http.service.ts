
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MemberModel } from './members/member.model'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({ providedIn: 'root' })
export class HttpService {

  private api = '/api/';
  private url = 'http://localhost:8081/api/organisation';

  constructor(
    private http: HttpClient,
    ) { }

// ----------------- CRUD -------------------


  // --------------GET ALL RECORDS ------------
  public getAllRecords(url): Observable<any> {
    return this.http.get<any>('http://localhost:8081/api/organisation').pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  // ----------- CREATE new record -----------

  public addRecord(url: string, recordData):  Observable<any> {
    return this.http.post('http://localhost:8081/api/organisation', recordData).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  // ---------- EDIT AND UPDATE --------------

  // ---- FETCH record detail for editing or viewing. ----

  public getRecordById(url, recordId): Observable<any> {
    return this.http.get<any>(`${'http://localhost:8081/api/organisation'}/${recordId}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  // ---- UPDATES an existing record ----

  public updateRecord(url, recordUpdate,recordId): Observable<any> {
     return this.http.put(`${'http://localhost:8081/api/organisation'}/${recordId}`, recordUpdate, httpOptions)
    .pipe(
      catchError((error: any) => {
        console.log("updatedsucessfullychch");
           console.error(error);
           return of();
         }),
    );
  }



  // --------- DELETES a single record. ---------

  public deleteRecord(url):  Observable<any> {
    return this.http.delete('http://localhost:8081/api/organisation').pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


// --------------- QUERIES ---------------------

  public searchCountries(url) {
    console.log(url);
    
    return this.http.get<any>('http://localhost:8081/api/organisation/organisation/org_code').pipe(
      map(data => {
        console.log(data);
        return data;
      }),
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  public searchCode(url) {
    return this.http.get<any>('http://localhost:8081/api/organisation/organisation/location_code').pipe(
      map(data => {
        return data;
      }),
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  // --------- INCREMENTAL SEARCH --------

  //  Called by the Mat Datatable search by last name.

  public nameSearch(terms) {
    return terms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => {
          const url = `/?contact_person=${term}`;
          return this.http.get('http://localhost:8081/api/organisation/organisation/contact_person');
      }),
      catchError((error: any) => {
           console.error(error);
           return of();
      }),
    );
  }

  // --------------- FORM CONTROLS ---------------------


  public validateUsername(name) {
 
    const url = `api/members/?name=${name}`;
    return this.http.get(url).pipe(
      map(data => {
        return data;
      }),
      catchError((error: any) => {
           console.error(error);
           return of();
           
      }),
    );
  }
}
