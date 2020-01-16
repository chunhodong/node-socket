const SocketIO = require('socket.io');

module.exports = (server,app,sessionMiddleware) => {

    const io = SocketIO(server,{path:'/socket.io'});

    app.set('io',io);
    //SocketIO에 namespace부여, 같은 namespace끼리만 데이터전송
    const room = io.of('/room');
    const chat = io.of('/chat');


    io.use((socket,next)=>{
        sessionMiddleware(socket.request,socket.request.res,next);
    });

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
        socket.to(roomId).emit('join',{
            user:'system',
            chat:`${req.session.color}님이 입장하셨습니다.`
        });

        socket.on('disconnect',()=>{
            console.log('chat namespace 접속해제');
            socket.leave(roomId);

            const currentRoom = socket.adapter.rooms[roomId];
            const userCount = currentRoom ? currentRoom.length : 0;
            if(userCount === 0){
                axios.delete(`http://localhost:8005/room/${roomId}`)
                .then(()=>{
                    console.log('방제거 요청성공');
                })
                .catch((error)=>{
                    console.log(error);
                });
            }
            else{
                socket.to(roomId).emit('exit',{
                    user:'system',
                    chat:`${req.session.color}님이 퇴장하셨습니다.`
                });

            }

        });
        
    });

}