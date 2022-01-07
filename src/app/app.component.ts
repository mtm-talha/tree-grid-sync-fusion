import { Component, OnInit ,Inject, ViewChild } from '@angular/core';
import { dataSource, virtualData } from './datasource';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid'
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

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
  name: string | undefined;

  public vData: Object[] = [];
  public pageSettings: Object | undefined;
  public toolbar: string[] = [];
  public contextMenuItems: Object[] = [];
  public editing: EditSettingsModel | undefined;
  public selectOptions: Object | undefined;

  @ViewChild('treegrid')
  public treegrid : TreeGridComponent | undefined ;

  constructor(public dialog: MatDialog) {}
  
  ngOnInit(): void {
      dataSource();
      this.vData = virtualData;
      this.pageSettings= { pageSize: 50 };
      this.toolbar = ['ColumnChooser']
      this.selectOptions = { type: 'Multiple' };

      this.contextMenuItems =  [
        {text: 'Add Column', target: '.e-headercontent', id: 'addHeaderColoumn'},
        {text: 'Edit Column', target: '.e-headercontent', id: ''},
        {text: 'Delete Column', target: '.e-headercontent', id: ''},
        {text: 'Choose Column', target: '.e-headercontent', id: 'chooseColumn'},
        {text: 'Freeze Column', target: '.e-headercontent', id: ''},
        {text: 'Filter Column', target: '.e-headercontent', id: ''},
        {text: 'Multisort Column', target: '.e-headercontent', id: ''},

        {text: 'Add Next', target: '.e-content', id: ''},
        {text: 'Add child', target: '.e-content', id: ''},
        'Edit',
        'Delete',
        'Save',
        'AddRow',
        {text: 'Multiselect', target: '.e-content', id: ''},
        {text: 'Copy rows', target: '.e-content', id: ''},
        {text: 'Cut rows', target: '.e-content', id: ''},
        {text: 'Paste next', target: '.e-content', id: ''},
        {text: 'Paste child', target: '.e-content', id: ''},
        
    ];

    this.editing = {
      newRowPosition:'Above',
      allowAdding:true, 
      allowDeleting:true, 
      showDeleteConfirmDialog:true, 
      showConfirmDialog:true, 
      allowEditing: true, 
      mode: 'Dialog'};
}

contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
}


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
  templateUrl: './dialogComponent/dialog.component.html',
  styleUrls: ['./dialogComponent/dialog.component.css']

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
