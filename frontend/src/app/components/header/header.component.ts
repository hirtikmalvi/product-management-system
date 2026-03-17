import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../services/user/user.model';
import { NgIf, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLinkActive, RouterLink, NgIf, NgSwitchDefault],
})
export class HeaderComponent implements OnInit {
  email: string = '';
  role: string = '';
  private authService = inject(AuthService);
  private titleService = inject(Title);
  private router = inject(Router);
  user!: User;
  userLoginStatus = false;

  ngOnInit(): void {
    this.titleService.setTitle('Register');

    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.role = user.role;
        console.log(user);
        this.userLoginStatus = true;
      } else {
        this.userLoginStatus = false;
        this.email = '';
        this.role = '';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
    this.authService.userSubject.next(null);
    this.userLoginStatus = false;
  }
}
