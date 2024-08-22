import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.routes').then(m => m.COURSES_ROUTES)
  },
  {
    path: 'students',
    loadChildren: () => import('./features/students/students.routes').then(m => m.STUDENTS_ROUTES)
  },
  {
    path: 'enrollments',
    loadChildren: () => import('./features/enrollments/enrollments.routes').then(m => m.ENROLLMENTS_ROUTES)
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/courses' } // Wildcard route for a 404 page
];