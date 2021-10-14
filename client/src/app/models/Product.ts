export class Product{
    public constructor(
        public id : any,
        public name : string,
        public categoryId : any,
        public price : any,
        public image : string,
        public quantity ?: number,
        public productId ?: number
    ){
        if(this.id == 0 || this.id == null || this.id == undefined){
            this.id = "";
        }

        if(this.categoryId == 0 || this.categoryId == null || this.categoryId == undefined){
            this.categoryId = "";
        }

        if(this.price == 0 || this.price == null || this.price == undefined){
            this.price = "";
        }
    }
}