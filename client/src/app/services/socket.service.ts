import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { productService } from './product.service';
import {saveAs} from "file-saver";
import { StateService } from './stateservice';
@Injectable()
export class SocketService {
  private socket: Socket;

  constructor(private productService: productService , private stateService : StateService) {
    this.socket = io('http://localhost:3003/', {
      query: { ['token']: sessionStorage.getItem('token') },
    });
    this.stateService.socket = this.socket;
  }

  SocketConnect() {
    //   this.socket
    return this.socket;
  }

  listen(eventName: string) {
    return new Observable((subscriber: any) => {
      this.socket.on(eventName, (data: any) => {
        console.log(eventName);
        switch (eventName){
          case "EDIT_PRODUCT":
            for (let i = 0; i < this.productService.products.length; i++) {
              if (this.productService.products[i].name == data.name) {
                this.productService.products[i] = data;
              }
            }
            break;
            case "ADD_ITEM":
            console.log(data , "!@#");
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            break;
        }


        subscriber.next(data);
      });
    });
  }

  // private editItemEventSocket(data : any){

  // }

  emit(eventName: string, data: any) {
    console.log(data);
    this.socket.emit(eventName, data);
  }
}
