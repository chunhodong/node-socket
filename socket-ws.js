const WebSocket = require('ws');

module.exports = (server) => {
    //서버웹소켓 생성
    console.log('서버 웹소켓 생성');
    const wss = new WebSocket.Server({server});

    wss.on('connection',(ws,req)=>{
        console.log('서버 웹소켓 연결성공');

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log('클라이언트접속 ',ip);

        ws.on('message',(message)=>{
            console.log(message);
        });

        ws.on('error',(error)=>{
            console.error(error);
        });

        ws.on('close',()=>{
            console.log('클라이언트 접속해제');

            clearInterval(ws.interval);
        });

        const interval = setInterval(()=>{
            if(ws.readyState === ws.OPEN){
             //   console.log('ws.OPEN');

                ws.send('서버에서 클라이언트로 메시지 전달');
            }
            if(ws.readyState === ws.CLOSED){
                console.log('ws.CLOSED');
            }
            if(ws.readyState === ws.CLOSING){
                console.log('ws.CLOSING');
            }
            if(ws.readyState === ws.CONNECTING){
                console.log('ws.CONNECTING');
            }

        },3000);
        ws.interval = interval;
    });

}