import { JsonObject, JsonProperty } from 'json2typescript';
import { Moment } from 'moment';
import { FileType } from './file-type.enum';
import { MomentConverter } from '../services/moment.converter';

@JsonObject
export class UserFile {

    @JsonProperty('name', String)
    public name: string = undefined;

    @JsonProperty('type', Number)
    public type: FileType = undefined;

    @JsonProperty('createdDate', MomentConverter)
    public createdDate: Moment = undefined;

    @JsonProperty('lastModifiedDate', MomentConverter)
    public lastModifiedDate: Moment = undefined;

    public position: number;

    constructor(init?: Partial<UserFile>) {
        Object.assign(this, init);
    }
}