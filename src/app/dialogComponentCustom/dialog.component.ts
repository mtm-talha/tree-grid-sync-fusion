import { Component, Inject } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from "../app.component";

@Component({
    selector: 'DialogComponent',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
  
  })
  export class DialogComponentCustom {
    public fontColor: string = '';
    public backGroundColor: string = '';
    constructor(
      public dialogRef: MatDialogRef<DialogComponentCustom>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }