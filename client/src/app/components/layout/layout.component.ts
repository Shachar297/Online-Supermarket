import { Component, OnInit , Input } from '@angular/core';
import { StateService } from 'src/app/services/stateservice';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
public span : number = 12;
  constructor(public stateService : StateService) { }

  ngOnInit(): void {
  }

  @Input()
  asideButtonClicked : boolean = false;
  myClick(){
    this.stateService.isAsideCollapsed = !this.stateService.isAsideCollapsed;
    
  }

}
