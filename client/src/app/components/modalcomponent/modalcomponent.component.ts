import { Component,  OnInit,  OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { itemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/orderService';
import { StateService } from 'src/app/services/stateservice';

@Component({
  selector: 'app-modalcomponent',
  templateUrl: './modalcomponent.component.html',
  styleUrls: ['./modalcomponent.component.css'],
})
export class ModalcomponentComponent implements OnInit{
  public items: [];
  constructor(private itemService: itemService,
    public stateService : StateService,
    public orderService : OrderService,
    private router : Router) {
      
    }


  ngOnInit(): void {
   this.closeModalWhileScrolling();
   this.isUserOrderedBefore();
  }
  
  isUserOrderedBefore(){
    let observable = this.orderService.isUserOrderedBefore();
    observable.subscribe(
      (answer) => {
        console.log(answer)
        this.stateService.isFirstOrder = answer;
      },
      (failedToGetAnswer) => {
        alert(failedToGetAnswer.error.error)
      }
    )
  }


  closeModal() {
this.stateService.isModalOpened = 'false';
  }

  addItemToCart(){
this.router.navigate(["/orders"])
  }

  closeModalWhileScrolling(){
    if(this.stateService.isCartExistsForCurrentUser){
      window.addEventListener("scroll" , ()=> this.closeModal())
    }
  }

   emptyUserCart() {
    let observable = this.itemService.removeAllItemsForCurrentUser();
    observable.subscribe(
      (removed) => {
        this.stateService.items = [];
        this.closeModal();
      },
      (failed) => {}
    );
  }
}
