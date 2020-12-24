import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  loginInvalid = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginCheck();
  }

  ngOnInit(): void { }

  loginCheck(): void {
    this.authService.loginCheck().subscribe(res => {
      console.log(res);
      if (!!res.is_admin) {
        this.router.navigate(['/admin']);
      }
      else {
        this.router.navigate(['/appointment']);
      }
    });
  }

  onSubmit(): void {
    const user = new User();
    user.email = this.form.get('email')?.value;
    user.password = this.form.get('password')?.value;

    this.authService.login(user).subscribe(res => {
      console.log(res);
      if (!!res.user.is_admin) {
        this.router.navigate(['/admin']);
      }
      else {
        this.router.navigate(['/appointment']);
      }

    });

  }

}
