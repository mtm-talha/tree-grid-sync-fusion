import { Component, OnInit } from '@angular/core';
import { dataSource, virtualData } from './datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'treeGrid';

  public vData: Object[] = [];
  public pageSettings: Object | undefined;
  public toolbar: string[] = [];

  ngOnInit(): void {
      dataSource();
      this.vData = virtualData;
      this.pageSettings= { pageSize: 50 };
      this.toolbar = ['ColumnChooser'];
}
}
