import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoriesService } from 'src/app/services/categories.service';
import { StateService } from 'src/app/services/stateservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isMouseOver: boolean = false;
  constructor(public stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    // this.getAllCategories();
  }

  onMouseOver() {
    this.isMouseOver = true;
  }

  onMouseOut() {
    this.isMouseOver = false;
  }
}
