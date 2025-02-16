import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbCollapseModule,
    RouterModule
  ]
})
export class NavComponent implements OnInit {
  public isNavbarCollapsed: boolean;

  constructor(public router: Router) {}

  ngOnInit() {
    this.isNavbarCollapsed = true;
  }
  
  ngOnDestroy() {}
}
