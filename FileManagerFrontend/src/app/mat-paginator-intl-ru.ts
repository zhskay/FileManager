import { MatPaginatorIntl } from '@angular/material';

export class MatPaginatorIntlRu extends MatPaginatorIntl {
    itemsPerPageLabel = 'Размер страницы';
    nextPageLabel = 'Следующая страница';
    previousPageLabel = 'Предыдущая страница';
    firstPageLabel = 'Первая страница';
    lastPageLabel = 'Последняя страница';

    getRangeLabel = (page, pageSize, length) => {
        if (length === 0 || pageSize === 0) {
            return '0 из ' + length;
        }

        length = Math.max(length, 0);
        const startIndex = page * pageSize;

        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return startIndex + 1 + ' - ' + endIndex + ' из ' + length;
    }
}