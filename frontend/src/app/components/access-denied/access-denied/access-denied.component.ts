import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
  imports: [RouterLink],
})
export class AccessDeniedComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Access Denied');
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['products']);
      }
    });
  }
}
