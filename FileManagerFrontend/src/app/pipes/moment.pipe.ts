import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
    name: 'fmDate'
})

export class MomentPipe implements PipeTransform {

    transform(value: any, format: string): any {
        return moment.utc(value).fromNow();
    }
}