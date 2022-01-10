import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import * as _ from 'lodash';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  /**
   * Creates an instance of commonService.
   */
  constructor(
    private snackBar: MatSnackBar
  ) {}

  /**
   * Handles errors
   */
  handleError(err: any): void {
    console.error('Error', JSON.stringify({
      filename: err.fileName || '',
      linenumber: err.lineNumber || '',
      message: err.message || ''
    }));
  }

  logInfo(info: string): void {
    if (!environment.production) {
      console.log('Info', info);
    }
  }

  deepCopy(obj: any): any {
    return _.cloneDeep(obj);
  }

  public isObjectEqual(origObject:any, object:any): boolean {
    const keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
      if (object[keys[i]] !== origObject[keys[i]]) {
        return false;
      }
    }

    return true;
  }

  public getLocalStorageItem(key:string) {
    const item = localStorage.getItem(`${environment.appCachePrefix}.${key}`);

    try {
      return JSON.parse(item ?? '');
    } catch (e) {
      return null;
    }
  }

  public setLocalStorageItem(key:string, value:any): void {
    if (value && value !== undefined || value === 0 && key) {
      localStorage.setItem(`${environment.appCachePrefix}.${key}`, JSON.stringify(value));
    }
  }

  public notify(
    message: string,
    type: 'success' | 'warn' | 'error' | 'info',
    action: string = 'DISMISS',
    config: MatSnackBarConfig = { duration: 5000 }) {

    config.panelClass = this.getPanelClass(type);

    return this.snackBar.open(message, action, config);
  }

  public camelizeString =(str:String):String=> {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }
  
  public camelStringToTitle = (camelCase:String) => camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

  private getPanelClass(type: string): string[] {
    switch (type) {
      case 'success':
        return ['bg-success', 'text-white'];
      case 'warn':
        return ['bg-warning', 'text-white'];
      case 'error':
        return ['bg-danger', 'text-white'];
      default:
        return [];
    }
  }

}
