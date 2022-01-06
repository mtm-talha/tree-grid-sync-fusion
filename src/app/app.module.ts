import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TreeGridModule, InfiniteScrollService, PageService, ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { SortService, ResizeService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridModule,
  ],
  providers: [
    ToolbarService,
    PageService,
    ColumnChooserService,
    InfiniteScrollService,
    SortService,
    ResizeService, 
    ExcelExportService, 
    PdfExportService, 
    ContextMenuService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
