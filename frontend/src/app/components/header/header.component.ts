import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string = '';
  private authService = inject(AuthService);
  private router = inject(Router);
  userLoginStatus = false;

  constructor(private titleService: Title) {
    this.username = 'Hirtik';
  }
  ngOnInit(): void {
    this.titleService.setTitle('Register');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
    this.userLoginStatus = false;
  }
}
