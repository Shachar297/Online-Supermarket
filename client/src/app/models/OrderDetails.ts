export class OrderDetails {
    public constructor(
        public city : string,
        public street : string,
        // public date : string,
        public creditCard : any,
        public total ?: number,
        public dateOrder ?: string,
        public numOfOrders ?: number,
        public id ?: number,
    ){
        if(this.creditCard == 0){
            this.creditCard = ""
        }
     }
}