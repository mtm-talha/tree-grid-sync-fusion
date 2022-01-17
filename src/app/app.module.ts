import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { DialogComponentCustom } from './dialogComponentCustom/dialog.component';
import { TreeGridModule, TreeGridAllModule, InfiniteScrollService, PageService, ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { SortService, EditService, FreezeService, FilterService, ResizeService, ContextMenuService , ReorderService, RowDDService, SelectionService  } from '@syncfusion/ej2-angular-treegrid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonAllModule , CheckBoxAllModule} from '@syncfusion/ej2-angular-buttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
@NgModule({
  declarations: [
    AppComponent,
    DialogComponentCustom
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
    MatSnackBarModule,
    DropDownListAllModule,
    ButtonAllModule,
    CheckBoxAllModule,
    TreeGridAllModule
    
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
    SelectionService,
    FreezeService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
