import { Component, Inject,OnInit } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from "../app.component";
import { FormGroup,FormControl} from '@angular/forms';
@Component({
    selector: 'DialogComponent',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
  
  })
  export class DialogComponent implements OnInit {    
    public fontColor: string = '';
    public backGroundColor: string = '';
    public selectOptions = 'text'
    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit (){
      if(this.data.field){
        console.log("Data-->",this.data);
        this.fontColor = this.data.customAttributes.style.color;
        this.backGroundColor = this.data.customAttributes.style.background;
      }
    }
    
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    onSubmit(data: any):void {
      var updateData = data;
      updateData = {...updateData,customAttributes: {style:{ 'background': this.backGroundColor, 'color': this.fontColor}},field :updateData.headerText.replace(/\s/g, '')};
      this.dialogRef.close({data:updateData});  
      console.log("updateData-->",updateData);
   }
   
  }