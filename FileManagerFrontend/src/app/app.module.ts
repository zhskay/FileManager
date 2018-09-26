import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { LayoutModule } from '@angular/cdk/layout';
import {
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatDialogModule, MatTooltipModule, MatSnackBarModule,
    MatPaginatorIntl, MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';

import { FileService } from './services';
import { FilePreviewOverlayService } from './components/file-preview-overlay/file-preview-overlay.service';
import { reducers, metaReducers, FileListEffects, FileListNotificationEffects } from './store';

import * as Components from './components';
import * as Pipes from './pipes';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { MatPaginatorIntlRu } from './mat-paginator-intl-ru';

export function jsonConvertFactory() {
    return new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);
}

@NgModule({
    providers: [
        FileService,
        { provide: JsonConvert, useFactory: jsonConvertFactory },
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlRu},
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000} },

        FilePreviewOverlayService
    ],
    declarations: [
        AppComponent,
        Components.LayoutComponent,
        Components.FileListComponent,
        Components.FileInputComponent,
        Components.FilePreviewOverlayComponent,
        Components.DocumentPreviewDialogComponent,

        Pipes.MomentPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES),

        // ngrx
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([FileListEffects, FileListNotificationEffects]),

        // material
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule
    ],
    entryComponents: [
        Components.FilePreviewOverlayComponent,
        Components.DocumentPreviewDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
