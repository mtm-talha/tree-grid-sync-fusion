import { Component, OnInit } from '@angular/core';
import { dummyData } from './datasource';
// import { dataSource, virtualData } from './datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'treeGrid';

  public jsonData: Object[] = [];
  public columnsSetting:any = [];
  public pageSettings: Object | undefined;
  public toolbar: string[] = [];
  public filterSettings: Object={};

  ngOnInit(): void {
    this.filterSettings = { type: 'Menu' };
      // dataSource();
    this.jsonData = dummyData
    this.columnsSetting=[
      {
        field :'taskID',
        headerText:'Task ID',
        width:'140',
        textAlign:'Right'
      },
      {
        field :'taskName',
        headerText:'Task Name',
        width:'140',
        textAlign:'Right'
      },
      {
        field :'startDate',
        headerText:'Start Date',
        width:'140',
        textAlign:'Right'
      },
      {
        field :'endDate',
        headerText:'End Date',
        width:'140',
        textAlign:'Right'
      },
      {
        field :'progress',
        headerText:'Progress',
        width:'140',
        textAlign:'Right'
      },
      {
        field :'approved',
        headerText:'Approved',
        width:'140',
        textAlign:'Right'
      },
    ]
      this.pageSettings= { pageSize: 50 };
  }
}


// const camalizeString = function camalize(str:String):String {
//   return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
// }