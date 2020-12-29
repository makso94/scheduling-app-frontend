import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmValidator } from 'src/app/customValidators/confirm-validator';
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

  form: FormGroup = this.fb.group({
    first_name: ['', [Validators.required, Validators.maxLength(32)]],
    last_name: ['', [Validators.required, Validators.maxLength(32)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(64)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
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
    private userService: UserService
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.create(this.form.value).subscribe(res => {
        this.router.navigate(['/']);
      });
    }
  }

}
