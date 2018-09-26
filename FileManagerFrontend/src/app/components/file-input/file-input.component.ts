import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fm-file-input',
    templateUrl: 'file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileInputComponent implements OnInit {

    @Input()
    public accept = '*.*';

    @Output()
    public fileChange: EventEmitter<File> = new EventEmitter<File>();

    @ViewChild('input')
    public input: ElementRef;

    constructor() { }

    ngOnInit() { }

    public openFileDialog() {
        this.input.nativeElement.click();
    }

    // input change handler
    public changeValue(input: HTMLInputElement): void {
        if (input.files && input.files.length) {
            this.fileChange.emit(input.files[0]);
        }
    }
}
