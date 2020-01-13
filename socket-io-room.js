const SocketIO = require('socket.io');

module.exports = (server,app) => {
    const io = SocketIO(server,{path:'/socket.io'});

    app.set('io',io);
    //SocketIO에 namespace부여, 같은 namespace끼리만 데이터전송
    const room = io.of('/room');
    const chat = io.of('/chat');


    room.on('connection',(socket)=>{
        console.log('room namespace 접속');
        socket.on('disconnect',()=>{
            console.log('room namespace 접속해제');
        });
    });

    chat.on('connection',(socket)=>{
        console.log('chat namespace 접속');
        const req = socket.request;
        const {headers:{referer}} = req;
        const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/,'');
        socket.join(roomId);

        socket.on('disconnect',()=>{
            console.log('chat namespace 접속해제');
            socket.leave(roomId);
        });
        
    });

}