import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavComponent } from 'app/nav/nav.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from 'app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    NavComponent,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    RouterOutlet
  ]
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/home']);
    window.addEventListener('load', function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }
  
  ngOnDestroy() {}
}
