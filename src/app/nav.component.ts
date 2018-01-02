import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css']
})

export class NavComponent implements OnInit {
  public isNavbarCollapsed;

  constructor() { }

  ngOnInit() {
    this.isNavbarCollapsed = true;
  }
}
