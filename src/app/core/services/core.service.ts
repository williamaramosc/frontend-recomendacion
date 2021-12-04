import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class CoreService {

  /**
   * Declaracion de variables
   */
  protected baseUrl: string = 'http://localhost:3000';
  info: any = {};

  constructor(private http: HttpClient) {
    
   }

  /**
   * Servicio get para traer
   * @param endpoint 
   * @returns 
   */
  get(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * servicio post para crear
   * @param endpoint 
   * @param element 
   * @returns 
   */
  post(endpoint: string, element: any) {
    return this.http.post(this.baseUrl + endpoint, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * servicio put para actualizar
   * @param endpoint 
   * @param element 
   * @returns 
   */
  put(endpoint: string, element: any) {
    return this.http.put(this.baseUrl + endpoint + '/' + element.id, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * servicio delete para borrar
   * @param endpoint 
   * @param id 
   * @returns 
   */
  delete(endpoint: string, id: any) {
    return this.http.delete(this.baseUrl + endpoint + '/' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Función para mostrar los errores
   * @param error 
   * @returns 
   */
  private handleError(error: HttpErrorResponse) {
    console.log("+++ begin DSI: ", new Date());
    console.log('+++ error.status=' + error.status);
    console.log("+++ error.message=", error.message);
    console.log("+++ error.error=", error.error);
    let msj = "";
    if (error.error instanceof ErrorEvent) {
      console.log("+++ ErrorEvent=", error.error.message);
      msj = error.error.message;
    } else if (error.error === 'Unauthorized.') {
      msj = "Uso de servicio no autorizado (Unauthorized).";
    } else if (error.error instanceof ProgressEvent && error.message.match("Unknown Error")) {
      console.log("+++ ERROR COM: ProgressEvent: ", error.message);
      msj = "ERROR COM: " + error.message;
    } else if (error.error instanceof ProgressEvent && !error.message.match("Unknown Error")) {
      console.log("+++ ProgressEvent: ", error.message);
      msj = error.message;
    } else if (Array.isArray(error.error)) {
      msj = error.error[0];
    } else {
      console.log("+++ dsi errors:", error.error.errors);
      if (error.error.errors.error) {
        if (Array.isArray(error.error.errors.error)) {
          msj = error.error.errors.error[0];
        } else {
          msj = error.error.errors.error;
        }
      } else if (Array.isArray(error.error.errors)) {
        msj = error.error.errors[0];
      } else {
        if (error.error.errors === undefined) {
          msj = error.message;
        } else {
          msj = error.error.errors;
        }
      }
    }
    console.log("+++ end DSI: ", new Date());
    return throwError(msj);
  }

}