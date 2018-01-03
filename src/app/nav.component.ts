import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css']
})

export class NavComponent implements OnInit {
  public isNavbarCollapsed;

  constructor(public router: Router) { }

  ngOnInit() {
    this.isNavbarCollapsed = true;
  }
}
