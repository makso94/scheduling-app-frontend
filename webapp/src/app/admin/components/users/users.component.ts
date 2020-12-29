import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { includes } from 'lodash';
import { User } from 'src/app/auth/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  formGroup!: FormGroup;
  users: Array<User> = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'actions'];
  userFilter = new User();

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      is_admin: [''],
    });



    this.formGroup.valueChanges.subscribe(filters => {
      console.log(filters);
      filters.first_name ? this.userFilter.first_name = filters.first_name : undefined;
      filters.last_name ? this.userFilter.last_name = filters.last_name : undefined;
      filters.email ? this.userFilter.email = filters.email : undefined;
      (includes(['0', '1'], filters.is_admin)) ? this.userFilter.is_admin = filters.is_admin : this.userFilter.is_admin = undefined;
      this.userService.getAll(this.userFilter).subscribe(res => {
        this.users = res.data;
      })
    });




    this.userService.getAll().subscribe(res => {
      this.users = res.data;
      console.log(this.users);

    });




  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
