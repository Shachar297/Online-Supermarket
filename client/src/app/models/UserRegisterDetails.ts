import { ThrowStmt } from "@angular/compiler";

export class UserRegisterDetails {
    public constructor(
        public username : string,
        public password : string,
        public userType : string,
        public identityNumber : any,
        public city : string,
        public street : string
    ){
        if(this.identityNumber == 0){
            this.identityNumber == ""
        }
    }
}