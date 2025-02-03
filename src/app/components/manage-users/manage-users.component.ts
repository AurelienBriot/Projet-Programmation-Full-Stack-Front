import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  searchQuery: string = '';

  users = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];

  filteredUsers = [...this.users];

  filterUsers() {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  addUser() {
    const newUser = { name: 'Nouvel Utilisateur', email: 'new.user@example.com' };
    this.users.push(newUser);
    this.filterUsers(); // Refresh filtered list
    alert('Nouvel utilisateur ajouté !');
  }

  editUser(user: any) {
    alert(`Modifier l'utilisateur: ${user.name}`);
  }

  deleteUser(user: any) {
    if (confirm(`Voulez-vous supprimer ${user.name} ?`)) {
      this.users = this.users.filter((u) => u !== user);
      this.filterUsers(); // Refresh filtered list
    }
  }
}
