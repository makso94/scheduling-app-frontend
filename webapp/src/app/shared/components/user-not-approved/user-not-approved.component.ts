import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-not-approved',
  templateUrl: './user-not-approved.component.html',
  styleUrls: ['./user-not-approved.component.scss']
})
export class UserNotApprovedComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {


  }

  logOut(): void {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/']);
      }
    )
  }

}
