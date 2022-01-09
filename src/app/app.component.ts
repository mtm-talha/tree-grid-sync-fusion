import { Component, OnInit ,Inject, ViewChild, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid'
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { GridDataService } from 'src/services/grid-data/grid-data.service';
import { CommonService } from 'src/services/common/common.service';

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
  public toolbar: string[] = [];
  public contextMenuItems: Object[] = [];
  public editing: EditSettingsModel | undefined;
  public selectOptions: Object | undefined;
  public gridTreeHeight:number=0;
  public isFilterEnabled:boolean = false;
  public isSortingEnabled:boolean = false;
  @ViewChild('treeGrid')
  public treeGrid : TreeGridComponent | undefined;

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
     this.gridDataSource = data;
    });

      this.gridTreeHeight=window.innerHeight-89
      this.pageSettings= { pageSize: 50 };
      this.toolbar = ['ColumnChooser']
      this.selectOptions = { type: 'Multiple' };
      this.isFilterEnabled=false
      this.isSortingEnabled=false
      this.contextMenuItems =  [
        {text: 'Add Column', target: '.e-headercontent', id: 'addColumnPopup'},
        {text: 'Edit Column', target: '.e-headercontent', id: ''},
        {text: 'Delete Column', target: '.e-headercontent', id: ''},
        {text: 'Choose Column', target: '.e-headercontent', id: 'chooseColumn'},
        {text: 'Freeze Column', target: '.e-headercontent', id: ''},
        {text: 'Filter Column', target: '.e-headercontent', id: 'toggleFilterColumn'},
        {text: 'Multisort Column', target: '.e-headercontent', id: 'toggleSortColumn'},

        {text: 'Add Next', target: '.e-content', id: ''},
        {text: 'Add child', target: '.e-content', id: ''},
        'Edit',
        'Delete',
        'Save',
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
    if (args.item.id === 'addColumnPopup') {
      this.openDialog();
    } 
    if(args.item.id==='toggleFilterColumn'){
      this.isFilterEnabled=!this.isFilterEnabled
    }

    if(args.item.id==='toggleSortColumn'){
      this.isSortingEnabled=!this.isSortingEnabled
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
