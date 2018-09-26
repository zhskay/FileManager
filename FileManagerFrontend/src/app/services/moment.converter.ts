import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import { Moment } from 'moment';
import * as moment from 'moment';

@JsonConverter
export class MomentConverter implements JsonCustomConvert<Moment> {

    serialize(date: Moment): any {
        return date.toISOString();
    }

    deserialize(date: any): Moment {
        return moment.utc(date);
    }
}