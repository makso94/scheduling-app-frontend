import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/auth/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User> = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'actions'];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll({ mario: 'maksimovic' }).subscribe(res => {
      this.users = res.data;
      console.log(this.users);

    });


  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
