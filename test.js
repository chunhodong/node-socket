class Room{


    constructor(){
        this.rooms = new Map();
    }

    getRoom(id){
        return this.rooms.get(id);
    }


    getRooms(){
        const result = [];
        for(let room of this.rooms.values()){
            result.push(room);
        }
        return result;

    }

    addRoom(room){
        let roomId;
        
        while(true){
            roomId = Math.floor(Math.random() * 1000000) + 1;
            if(this.rooms.has(roomId) == false)break;    
        }
        room.id = roomId;
        this.rooms.set(roomId,room);
        return roomId;

    }

    removeRoom(id){
        this.rooms.delete(id);

    }

}
const faw = new Room();
Object.freeze(faw);
faw.bing = 3;
console.log('bing : ',faw.bing);