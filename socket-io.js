const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server,{path:'/socket.io'});


    //클라이언트가 접속했을때 발생
    io.on('connection',(socket) =>{
        //요청객체에 접근
        const req = socket.request;
        
        //응답객체
        const res = socket.request.res;

        //소켓고유아이디접근
        console.log('socket id : ',socket.id);


        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log('새로운 클라이언트 접속!',ip,socket.id,req.ip);
        
        //클라이언트가 연결을 끊었을때 발생
        socket.on('disconnect',()=>{
            console.log('클라이언트 접속 해제',ip,socket.id);
        });

        //통신과정중에러
        socket.on('error',(error)=>{
            console.error(error);

        });

        //사용자정의 이벤트(클라이언트에스 reply라는 이벤트명으로 전송)
        socket.on('reply',(data)=>{
            console.log(data);
        });

        socket.interval = setInterval(()=>{
            socket.emit('news','Hello Socket.IO');
        },3000);

        
    });

}