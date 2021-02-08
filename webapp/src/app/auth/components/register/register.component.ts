import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmValidator } from 'src/app/shared/validators/confirm-validator';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  hide = true;
  hideConfirm = true;
  isAdmin = false;

  form: FormGroup = this.fb.group({
    first_name: ['', [Validators.required, Validators.maxLength(32)]],
    last_name: ['', [Validators.required, Validators.maxLength(32)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(64)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(64)]],
    confirm_password: ['', [Validators.required]],
    is_admin: [false]
  },
    {
      validator: ConfirmValidator('password', 'confirm_password')
    },
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      this.isAdmin = !!user.is_admin;
    });

  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.create(this.form.value).subscribe(res => {
        this.isAdmin ?
          this.router.navigate(['/admin/users']) :
          this.router.navigate(['/']);
      });
    }
  }

}
