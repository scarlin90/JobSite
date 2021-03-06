/**
 * JobSite API.
 * this api has three main resources jobs, contacts and applicants
 *
 * OpenAPI spec version: 0.0.1
 * Contact: seancarlin90@googlemail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http'
import { CustomHttpUrlEncodingCodec } from '../encoder'

import { Observable } from 'rxjs'

import { BASE_PATH, COLLECTION_FORMATS } from '../variables'
import { Configuration } from '../configuration'

@Injectable()
export class ApplicantsService {
  protected basePath = 'http://localhost:8000'
  public defaultHeaders = new HttpHeaders()
  public configuration = new Configuration()

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration,
  ) {
    if (basePath) {
      this.basePath = basePath
    }
    if (configuration) {
      this.configuration = configuration
      this.basePath = basePath || configuration.basePath || this.basePath
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data'
    for (const consume of consumes) {
      if (form === consume) {
        return true
      }
    }
    return false
  }

  /**
   *
   * create new applicant
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createApplicant(
    body?: any,
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<any>
  public createApplicant(
    body?: any,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<any>>
  public createApplicant(
    body?: any,
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<any>>
  public createApplicant(
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false,
  ): Observable<any> {
    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json']
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']

    return this.httpClient.post<any>(`${this.basePath}/applicants`, body, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    })
  }

  /**
   *
   * remove applicant by identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteApplicant(
    id: number,
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<any>
  public deleteApplicant(
    id: number,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<any>>
  public deleteApplicant(
    id: number,
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<any>>
  public deleteApplicant(
    id: number,
    observe: any = 'body',
    reportProgress: boolean = false,
  ): Observable<any> {
    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json']
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']

    return this.httpClient.delete<any>(
      `${this.basePath}/applicants/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      },
    )
  }

  /**
   *
   * get applicant by identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getApplicant(
    id: number,
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<any>
  public getApplicant(
    id: number,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<any>>
  public getApplicant(
    id: number,
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<any>>
  public getApplicant(
    id: number,
    observe: any = 'body',
    reportProgress: boolean = false,
  ): Observable<any> {
    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json']
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']

    return this.httpClient.get<any>(
      `${this.basePath}/applicants/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      },
    )
  }

  /**
   *
   * get list of all applicants
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getApplicants(
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<any>
  public getApplicants(
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<any>>
  public getApplicants(
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<any>>
  public getApplicants(
    observe: any = 'body',
    reportProgress: boolean = false,
  ): Observable<any> {
    let headers = this.defaultHeaders

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json']
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts)
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']

    return this.httpClient.get<any>(`${this.basePath}/applicants`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    })
  }
}
