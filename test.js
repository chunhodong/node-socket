class Room{


    constructor(){
        //this.title = 32;
    }

    setTitle(t){
        this.title = t;
    }

    getTitle(){
        return this.title;

    }



}

const r = new Room();
const re = r.getTitle();
console.log('re : ',re);
if(re === undefined){
    console.log('undefined!!');

}
r.setTitle('34');
const reb = r.getTitle();
console.log('re : ',reb);



