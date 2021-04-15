import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

}
