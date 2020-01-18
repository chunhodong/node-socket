class Room{


    constructor(){
     this.rooms = [];   
    }

    getRooms(){
        return this.rooms;
    }

    addRoom(room){
        this.rooms.push(room);

    }

    addRoom(title,max,owner,password){
        this.rooms.push({title,max,owner,password});
    }

}

module.exports = new Room();