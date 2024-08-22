import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from '../../../../shared/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../../../../shared/delete-dialog/delete-dialog.component';

interface User {
  id: number;
  name: string;
  email: string;
}


@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})

export class CoursesPageComponent {

  users: User[] = [
    { id: 1, name: 'John dddd', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];
  
    displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  
    constructor(private dialog: MatDialog) {}
  
    ngOnInit(): void {}
  
    editUser(user: User): void {
      const dialogRef = this.dialog.open(EditDialogComponent, {
        width: '250px',
        data: { ...user }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Update user in the list
          const index = this.users.findIndex(u => u.id === result.id);
          if (index !== -1) {
            this.users[index] = result;
          }
        }
      });
    }
  
    deleteUser(user: User): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '250px',
        data: { name: user.name }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Remove user from the list
          this.users = this.users.filter(u => u.id !== user.id);
        }
      });
    }
  }

