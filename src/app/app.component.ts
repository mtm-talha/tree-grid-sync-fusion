import { Component, OnInit ,Inject } from '@angular/core';
import { dataSource, virtualData } from './datasource';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'treeGrid';
  animal: string | undefined;
  name: string | undefined;

  public vData: Object[] = [];
  public pageSettings: Object | undefined;
  public toolbar: string[] = [];
  public contextMenuItems: Object[] = [];

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
      dataSource();
      this.vData = virtualData;
      this.pageSettings= { pageSize: 50 };
      this.toolbar = ['ColumnChooser'];
      this.contextMenuItems =  [
        {text: 'Add Column', target: '.e-headercontent', id: 'addHeaderColoumn'},
        {text: 'Edit Column', target: '.e-headercontent', id: ''},
        {text: 'Delete Column', target: '.e-headercontent', id: ''},
        {text: 'Choose Column', target: '.e-headercontent', id: ''},
        {text: 'Freeze Column', target: '.e-headercontent', id: ''},
        {text: 'Filter Column', target: '.e-headercontent', id: ''},
        {text: 'Multisort Column', target: '.e-headercontent', id: ''},

        {text: 'Add Next', target: '.e-content', id: ''},
        {text: 'Add child', target: '.e-content', id: ''},
        {text: 'Delete row', target: '.e-content', id: ''},
        {text: 'Edit row', target: '.e-content', id: ''},
        {text: 'Multiselect', target: '.e-content', id: ''},
        {text: 'Copy rows', target: '.e-content', id: ''},
        {text: 'Cut rows', target: '.e-content', id: ''},
        {text: 'Paste next', target: '.e-content', id: ''},
        {text: 'Paste child', target: '.e-content', id: ''},
    ];
}

contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {}


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  contextMenuClick (args: MenuEventArgs): void {
    if (args.item.id === 'addHeaderColoumn') {
      this.openDialog();
    } 
}

}

@Component({
  selector: 'DialogComponent',
  templateUrl: './dialog.component.html',

})
export class DialogComponent {
  public fontColor: string = '';
  public backGroundColor: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
