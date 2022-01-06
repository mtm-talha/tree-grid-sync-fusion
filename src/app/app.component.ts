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
  public contextMenuItems: Object[] = [];

  ngOnInit(): void {
      dataSource();
      this.vData = virtualData;
      this.pageSettings= { pageSize: 50 };
      this.toolbar = ['ColumnChooser'];
      this.contextMenuItems =  [
        {text: 'Add Column', target: '.e-headercontent', id: ''},
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

contextMenuOpen(arg?: any): void {}

}
