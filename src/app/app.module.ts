import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent , DialogComponent } from './app.component';
import { TreeGridModule, InfiniteScrollService, PageService, ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { SortService, EditService, FilterService, ResizeService, ContextMenuService , ReorderService, RowDDService, SelectionService } from '@syncfusion/ej2-angular-treegrid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    TreeGridModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ColorPickerModule,
    HttpClientModule ,
    MatSnackBarModule 
  ],
  providers: [
    ToolbarService,
    PageService,
    ColumnChooserService,
    InfiniteScrollService,
    SortService,
    FilterService,
    EditService,
    ResizeService,
    ContextMenuService,
    ReorderService,
    RowDDService,
    SelectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
