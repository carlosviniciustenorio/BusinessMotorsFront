import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(credentials: { email: string, senha: string }): void {
    this.authService.login(credentials).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
