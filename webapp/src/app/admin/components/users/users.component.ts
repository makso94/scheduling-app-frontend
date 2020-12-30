import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { includes } from 'lodash';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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



    this.formGroup.valueChanges
      .pipe(
        debounceTime(400),
      ).subscribe(filters => {

        console.log(filters);

        this.userService.getAll(filters)
          .subscribe(res => {
            this.users = res.data;
          })
      });




    this.userService.getAll()
      .subscribe(res => {
        this.users = res.data;
        console.log(this.users);

      });




  }


  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
