import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private authService: AuthService, private router: Router){}
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
