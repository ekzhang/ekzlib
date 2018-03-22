import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.scrollTo(0, 1);
      }, 0);
    });
  }
}
