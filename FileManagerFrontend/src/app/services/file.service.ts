import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { environment } from 'environments/environment';

import { UserFile } from '@fm-models';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FileService {

    constructor(
        private httpClient: HttpClient,
        private jsonConvert: JsonConvert
    ) { }

    /** Upload files to server */
    public uploadFiles(...files: File[]): Observable<UserFile[]> {
        const form = new FormData();

        for (const file of files) {
            form.append('file', file, file.name);
        }

        return this.httpClient.post(environment.apiUrl + '/api/v1/files', form).pipe(
            map(response => this.jsonConvert.deserialize(response, UserFile))
        );
    }

    /** Get all files */
    public getFiles(): Observable<UserFile[]> {
        return this.httpClient.get(environment.apiUrl + '/api/v1/files').pipe(
            map(response => this.jsonConvert.deserialize(response, UserFile))
        );
    }

    /** Delete file */
    public deleteFile(fileName: string): Observable<UserFile> {
        const params = new HttpParams().append('name', fileName);

        return this.httpClient.delete(environment.apiUrl + '/api/v1/files', {params}).pipe(
            map(response => this.jsonConvert.deserialize(response, UserFile))
        );
    }

    /** Get file path */
    public getFilePath(fileName: string) {
        return `${environment.apiUrl}/api/v1/files/${encodeURIComponent(fileName)}`;
    }

    /** Get text file content */
    public getTextFileContent(fileName: string) {
        const filePath = this.getFilePath(fileName);

        return this.httpClient.get(filePath, { responseType: 'text' }).pipe(
            map(response => response)
        );
    }
}