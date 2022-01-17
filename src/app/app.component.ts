import { Component, OnInit ,Inject, ViewChild, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid'
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

import { CommonService } from 'src/services/common/common.service';
import { DialogComponent } from './dialogComponent/dialog.component';
import { GridDataService } from 'src/services/grid-data/grid-data.service';

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
  public columnsSetting:any = [];

  public gridDataSource: Object[] = [];
  public pageSettings: Object | undefined;
  public toolbar: any;
  public dragAndDropEnabled:any;
  public contextMenuItems: Object[] = [];
  public editing: EditSettingsModel | undefined;
  public selectOptions: Object | undefined;
  public gridTreeHeight:number=0;
  public edit: Object | undefined;
  public isFilterEnabled:boolean = false;
  public isSortingEnabled:boolean = false;
  public isColumnChooserEnabled:boolean=false;
  @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;

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
     properties.forEach((property:string , index)=>{
              
       this.columnsSetting.push({
          field :property,
          headerText: this.commonService.camelStringToTitle(property),
          width:'140',
          textAlign:'right',
          dataType: "text",
          textWrap: "true",
          customAttributes: {style:{ 'background': "#fffff", 'color': "#ccccc"}}
       })
     })
     this.gridDataSource = data;     
    });

      this.gridTreeHeight=window.innerHeight-89
      this.pageSettings= { pageSize: 50 };
      this.dragAndDropEnabled=false
      this.isFilterEnabled=false
      this.isSortingEnabled=false
      this.isColumnChooserEnabled=true

            

      this.contextMenuItems =  [
        {text: 'Add Column', target: '.e-headercontent', id: 'addColumnPopup'},
        {text: 'Edit Column', target: '.e-headercontent', id: 'editColumn'},
        {text: 'Delete Column', target: '.e-headercontent', id: 'deleteColumn'},
        {text: 'Choose Column', target: '.e-headercontent', id: 'toggleChooseColumn'},
        {text: 'Freeze Column', target: '.e-headercontent', id: ''},
        {text: 'Filter Column', target: '.e-headercontent', id: 'toggleFilterColumn'},
        {text: 'Multisort Column', target: '.e-headercontent', id: 'toggleSortColumn'},

        'Add', 'Edit', 'Delete', 'Update', 'Cancel',
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

  contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {}
  openDialog(index:number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result.data.field && result.data.backGroundColor &&  result.data.textAlign){
        // this.columnsSetting.push(result.data);
        this.columnsSetting.splice(index,0, result.data);
      // }
    });
    
  }

  editDialog(data:any ,indexColumn:any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      
        // this.columnsSetting = this.columnsSetting.filter((item:any , index:any) => {
        //   if(index == indexColumn){
        //       return result.data
        //   }
        //   else{
        //     return item;
        //   }
        // });
        this.columnsSetting = [...this.columnsSetting , this.columnsSetting[result.data]];
        console.log("columnsSetting--->",this.columnsSetting)
      
    });

    console.log("dialogRef-->",dialogRef)
    
  }

  contextMenuClick (args: any): void {
    if (args.item.id === 'addColumnPopup') {
      let index = args.column.index;
      this.openDialog(index);     
    }else if(args.item.id === 'deleteColumn') {

      let fieldID = args.column.field;
      this.gridDataSource = this.gridDataSource.filter((item:any) => delete item[fieldID]);
      this.columnsSetting = this.columnsSetting.filter((item:any) => {
        if(item.field != fieldID){
            return item
        }
      });
    }else if( args.item.id == "editColumn"){
      let index = args.column.index;
      this.editDialog(this.columnsSetting[index] , index);
      // 
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
      this.selectOptions = { type: 'Multiple' };
    } 
  }
}


