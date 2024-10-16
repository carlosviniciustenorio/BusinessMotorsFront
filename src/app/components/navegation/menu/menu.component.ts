import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  isAuthenticated = false;
  constructor(private authService: AuthService, private router: Router){}
  
  ngOnInit(): void {
    this.authService.validateToken();
    this.isAuthenticated = this.authService.isAuthenticated;

    this.authService.loginEvent.subscribe(() => {
      this.isAuthenticated = true;
    });

    this.authService.logoutEvent.subscribe(() => {
      this.isAuthenticated = false;
    });
  }

  isLoginPage() {
    return this.router.url === '/login';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
