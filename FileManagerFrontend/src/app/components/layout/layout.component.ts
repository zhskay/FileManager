import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'fm-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

    public isHandset$: Observable<boolean>;

    constructor(
        private breakpointObserver: BreakpointObserver
    ) {
        this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
            map(result => result.matches)
        );
    }

    ngOnInit() {
        moment.locale('ru');
    }
}