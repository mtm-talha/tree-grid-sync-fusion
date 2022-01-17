import { Component, OnInit ,Inject, ViewChild, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid'
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

import { CommonService } from 'src/services/common/common.service';
import { DialogComponentCustom } from './dialogComponentCustom/dialog.component';
import { GridDataService } from 'src/services/grid-data/grid-data.service';
import { freezeDirection, Column } from '@syncfusion/ej2-grids';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent,ButtonPropsModel } from '@syncfusion/ej2-angular-popups';

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


  @ViewChild('treeGrid')
  public treeGrid !: TreeGridComponent;
  @ViewChild('columndropdown')
  public columnDropDown!: DropDownListComponent;
  @ViewChild('directiondropdown')
  public directionDropDown!: DropDownListComponent;
  @ViewChild('alertDialog')
  public alertDialog!: DialogComponent;
  
  public columnsSetting:any = [];
  public gridDataSource: Object[] = [];
  public pageSettings: Object | undefined;
  public toolbar: any;
  public showFreezecolumns:boolean=false
  public dragAndDropEnabled:any;
  public contextMenuItems: Object[] = [];
  public editing: EditSettingsModel | undefined;
  public selectOptions: Object | undefined;
  public gridTreeHeight:number=0;
  public edit: Object | undefined;
  public isFilterEnabled:boolean = false;
  public isSortingEnabled:boolean = false;
  public isColumnChooserEnabled:boolean=false;
  public refresh: boolean = true;
  public visible: boolean = false;
  public fields: object = { text: 'name', value: 'id' };
  public animationSettings: object = { effect: 'None' };
  public content: string = 'Atleast one Column should be movable';
  public header: string = 'Frozen';
  public showCloseIcon: boolean = false;
  public target: string = '.control-section';
  public width: string = '300px';
  public directionData: Object[] = [
    { id: 'Left', name: 'Left' },
    { id: 'Right', name: 'Right' },
        { id: 'Center', name: 'Center' }
];
public columnData: Object[]=[]

  constructor(public dialog: MatDialog,
    private gridDataService: GridDataService,
    private commonService: CommonService,
    ) {}
  @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      this.gridTreeHeight=event.target.innerHeight-89

  }
  ngOnInit(): void {
    this.gridDataService.getFakeData().subscribe(data => { 
     const properties=Object.keys(data.reduce((o:any,c:any) => Object.assign(o,c)));
     properties.forEach((property:string)=>{
       this.columnsSetting.push({
          field :property,
          headerText: this.commonService.camelStringToTitle(property),
          width:'140',
          textAlign:'Right'
       })
     })
     this.columnData =  this.columnsSetting.map((column:any)=>{
      return {
        id:column.field,
        name:column.headerText,
      }
    });
     this.gridDataSource = data;
    });

      this.gridTreeHeight=window.innerHeight-89
      this.pageSettings= { pageSize: 50 };
      this.dragAndDropEnabled=false
      this.isFilterEnabled=false
      this.isSortingEnabled=false
      this.isColumnChooserEnabled=true
      this.showFreezecolumns=false

      console.log("oninit toolbarr", this.toolbar)
      

      this.contextMenuItems =  [
        {text: 'Add Column', target: '.e-headercontent', id: 'addColumnPopup'},
        {text: 'Edit Column', target: '.e-headercontent', id: ''},
        {text: 'Delete Column', target: '.e-headercontent', id: 'deleteColumn'},
        {text: 'Choose Column', target: '.e-headercontent', id: 'toggleChooseColumn'},
        {text: 'Freeze Column', target: '.e-headercontent', id: 'toggleFreezeColumns'},
        {text: 'Filter Column', target: '.e-headercontent', id: 'toggleFilterColumn'},
        {text: 'Multisort Column', target: '.e-headercontent', id: 'toggleSortColumn'},

        'Edit', 'Delete', 'Update', 'Cancel',
        {text: 'Add Next', target: '.e-content', id: ''},
        {text: 'Add child', target: '.e-content', id: ''},
        {text: 'Multiselect', target: '.e-content', id: 'toggleMultiSelectRows'},
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

public columnChange(e: ChangeEventArgs): void {
  let columnName: string = e.value as string;
  console.log("this.treeGrid.grid",this.treeGrid)
        let column: Column = this.treeGrid.grid.getColumnByField(columnName);
        let value: string = column.freeze === undefined ? 'Center' : column.freeze;
        this.refresh = this.directionDropDown.value === value;
        this.directionDropDown.value = value;
}
public directionChange(e: ChangeEventArgs): void {
  if (this.refresh) {
    let columnName: string = this.columnDropDown.value as string;    
    let mvblColumns: Column[] = this.treeGrid.grid.getMovableColumns();
    if (
      mvblColumns.length === 1 &&
      columnName === mvblColumns[0].field &&
      e.value !== mvblColumns[0].freeze
    ) {
      this.refresh = false;
      this.directionDropDown.value = 'Center';
      this.directionDropDown.refresh();
    } else {
      console.log('this.mvblColumns false',columnName)
      console.log('e.value',e.value)
      console.log('this.getColumnByField',this.treeGrid.grid.getColumnByField(columnName))
      // this.treeGrid.grid.getColumnByField(columnName).freeze =
      //   e.value === 'Center' ? 'Left'  : (e.value as freezeDirection);
        
        this.treeGrid.refreshColumns();
    }
  }
  this.refresh = true;
}

public alertDialogBtnClick = (): void => {
  this.alertDialog.hide();
};

public dlgButtons: ButtonPropsModel[] = [
  {
    click: this.alertDialogBtnClick.bind(this),
    buttonModel: { content: 'OK', isPrimary: true }
  }
];


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponentCustom, {
      width: '300px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  contextMenuClick (args: MenuEventArgs): void {
    if (args.item.id === 'addColumnPopup') {
      this.openDialog();
    } 
    if(args.item.id==='toggleFilterColumn'){
      this.isFilterEnabled=!this.isFilterEnabled
    }

    if(args.item.id==='toggleSortColumn'){
      this.isSortingEnabled=!this.isSortingEnabled
    }

    if(args.item.id === 'toggleChooseColumn'){
      if(this.toolbar==undefined){
        this.toolbar=['ColumnChooser'];
      }else{
        this.toolbar = undefined;
      }
     }
    if(args.item.id === 'toggleMultiSelectRows'){
      this.dragAndDropEnabled =!  this.dragAndDropEnabled
      this.selectOptions ={ type: 'Multiple' };
    } 
    if(args.item.id == 'toggleFreezeColumns'){
      this.showFreezecolumns =! this.showFreezecolumns
    }

}
}
