import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from '../../../../shared/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../../../../shared/delete-dialog/delete-dialog.component';
import Course from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css',
})
export class CoursesPageComponent {
  courses: Course[] = [];
  errorMessage = '';
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'capacity',
    'credits',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    private courseService: CourseService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAllCourses();
  }

  async getAllCourses(): Promise<void> {
    try {
      this.courses = await firstValueFrom(this.courseService.getAll());
      console.log(this.courses);
      this.errorMessage = '';
    } catch (error) {
      console.error(error);
      this.errorMessage = 'unable to load courses. Please try again later';
    }
  }

  editCourse(course: Course): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: { ...course },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update user in the list
        const index = this.courses.findIndex((u) => u.id === result.id);
        if (index !== -1) {
          this.courses[index] = result;
        }
      }
    });
  }

  deleteCourse(course: Course): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { name: course.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courses = this.courses.filter((u) => u.id !== course.id);
      }
    });
  }
}
