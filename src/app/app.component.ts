import { Component, OnInit ,Inject, ViewChild, HostListener } from '@angular/core';
import { dataSource, virtualData } from './datasource';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid'
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
<<<<<<< Updated upstream
=======
import { GridDataService } from 'src/services/grid-data/grid-data.service';
import { CommonService } from 'src/services/common/common.service';
import { DialogComponent } from './dialogComponent/dialog.component';
>>>>>>> Stashed changes

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
  public treegrid : TreeGridComponent | undefined ;

  constructor(public dialog: MatDialog) {}
  @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      this.gridTreeHeight=event.target.innerHeight-89

  }
  ngOnInit(): void {
<<<<<<< Updated upstream
      dataSource();
=======
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
     this.gridDataSource = data;
    });

>>>>>>> Stashed changes
      this.gridTreeHeight=window.innerHeight-89
      this.vData = virtualData;
      this.pageSettings= { pageSize: 50 };
      this.dragAndDropEnabled=false
      this.isFilterEnabled=false
      this.isSortingEnabled=false
      this.isColumnChooserEnabled=true

      console.log("oninit toolbarr", this.toolbar)
      

      this.contextMenuItems =  [
        {text: 'Add Column', target: '.e-headercontent', id: 'addColumnPopup'},
        {text: 'Edit Column', target: '.e-headercontent', id: ''},
        {text: 'Delete Column', target: '.e-headercontent', id: ''},
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
    
    
}

}


