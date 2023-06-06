import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCommonService {
  constructor(private _http: HttpClient) {}

  public defaultOptions = {};

  public defaultHeaders = {
    'Content-Type': 'application/json',
  };

  /**
   * Retrieve the default headers plus custom headers. This is used to inject the custom headers on the http call.
   * Usage:
   *   const customHeaders = { 'User-Agent': 'xxxxx' };
   *   const headers = this._httpCommonService.getHttpHeaders(customHeaders);
   *   const httpOptions = { headers: headers };
   *   this._httpCommonService.httpGet(url, httpOptions);
   *
   * @param {*} [customHeaders={}]
   * @returns {HttpHeaders}
   * @memberof HttpCommonService
   */
  getHttpHeaders(customHeaders = {}): HttpHeaders {
    const headers = new HttpHeaders(
      Object.assign({}, this.defaultHeaders, customHeaders)
    );
    return headers;
  }

  /**
   * Retrieve the default http options plus custom http options. This will apply when making a http call.
   *
   * @param {*} [httpOptions={}]
   * @returns {any}
   * @memberof HttpCommonService
   */
  getHttpOptions(httpOptions = {}) {
    this.defaultOptions = {
      headers: this.getHttpHeaders(),
    };
    const options = Object.assign({}, this.defaultOptions, httpOptions);
    return options;
  }

  /**
   * HTTP call for GET method.
   *
   * @param {string} url
   * @param {*} [httpOptions={}]
   * @returns
   * @memberof HttpCommonService
   */
  httpGet(url: string, httpOptions = {}) {
    const options = this.getHttpOptions(httpOptions);
    return this._http.get(url, options);
  }

  /**
   * HTTP call for POST method.
   *
   * @param {string} url
   * @param {*} param
   * @param {*} [httpOptions={}]
   * @returns
   * @memberof HttpCommonService
   */
  httpPost(url: string, param: any, httpOptions = {}) {
    const options = this.getHttpOptions();
    return this._http.post(url, param, options);
  }

  /**
   * HTTP call for file uploading POST call.
   *
   * @param {string} url
   * @param {*} param
   * @param {*} [httpOptions={}]
   * @returns
   * @memberof HttpCommonService
   */
  httpFilePost(url: string, param: any, httpOptions = {}) {
    // Remove 'Content-Type' header info
    // this.headers.delete('Content-Type');
    this.defaultHeaders['Content-Type'] = '';
    const options = this.getHttpOptions(httpOptions);
    return this._http.post(url, param, options);
  }

  /**
   * HTTP call for PUT method.
   *
   * @param {string} url
   * @param {*} param
   * @param {*} [httpOptions={}]
   * @returns
   * @memberof HttpCommonService
   */
  httpPut(url: string, param: any, httpOptions = {}) {
    const options = this.getHttpOptions();
    return this._http.put(url, param, options);
  }

  /**
   * HTTP call for DELETE method.
   *
   * @param {string} url
   * @param {*} [httpOptions={}]
   * @returns
   * @memberof HttpCommonService
   */
  httpDelete(url: string, httpOptions = {}) {
    const options = this.getHttpOptions();
    return this._http.delete(url, options);
  }

  /**
   * HTTP call for GET method.
   *
   * @param {string} url
   * @param {*} [httpOptions={}]
   * @returns
   * @memberof HttpCommonService
   */
  httpFileDownload(url: string, downloadFilename: string) {
    return this._http
      .get(url, {
        responseType: 'arraybuffer',
        headers: this.defaultHeaders,
      })
      .subscribe((response) => {
        this.downLoadFile(response, 'application/zip', downloadFilename);
      });
  }

  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  downLoadFile(data: any, type: string, filename: string) {
    let file = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(file);
    var anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
  }

  /**
   * HTTP call for DELETE method. This function allows to add the payload in the body when call.
   *
   * @param {string} url
   * @param {*} payload
   * @param {*} [httpOptions={}]
   * @returns
   * @memberof HttpCommonService
   */
  httpDeleteWithPayload(url: string, payload: any, httpOptions = {}) {
    const options = this.getHttpOptions({ body: payload });
    return this._http.delete<Response>(url, options).pipe(
      map((response: Response) => {
        return response;
      }),
      catchError((error) => {
        return this.handleErrorObservable(error);
      })
    );
  }

  /**
   * Error handler for all HTTP calls. This handler will re-throw when HTTP throws error.
   */
  handleErrorObservable(error: Response | any) {
    const data = { error: error };
    if (error && error.status) {
      if (error.status === 401 || error.status === 429) {
      }
    }
    return throwError(data);
  }
}
