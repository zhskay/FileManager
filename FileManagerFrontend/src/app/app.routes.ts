import { Routes } from '@angular/router';
import { LayoutComponent, FileListComponent } from '@fm-components';

export const ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'files',
                pathMatch: 'full',
                component: FileListComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'files'
            }
        ]
    }
];