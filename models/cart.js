module.exports=function Cart(oldcart){
    this.items=oldcart.items||{};
    this.totalQty=oldcart.totalQty||0;
    this.totalPrice=oldcart.totalPrice||0;

    this.add=function(item,itemid){
        var founditem=this.items[itemid];
        if(!founditem){
            founditem=this.items[itemid]={item:item,qty:0,price:0};
        }
        founditem.qty++;
        founditem.price=founditem.item.price*founditem.qty;
        this.totalPrice+=founditem.item.price;
        this.totalQty++;
    };

    this.toArray=function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
        
    }

}