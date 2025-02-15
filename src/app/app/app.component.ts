import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavComponent } from 'app/nav/nav.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from 'app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCode, faSync, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
  constructor(private router: Router, library: FaIconLibrary) {
    library.addIcons(faCode, faSync, faDownload, faTrashAlt, faGithub);
  }

  ngOnInit() {
    // This line makes the router automatically navigate to the URL.
    this.router.navigateByUrl(location.pathname);
    window.addEventListener('load', function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }
  
  ngOnDestroy() {}
}
