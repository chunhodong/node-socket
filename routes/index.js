var express = require('express');
var router = express.Router();
const room = require('./room');

//방목록
router.get('/', function(req, res, next) {
  const rooms = room.getRooms();
  console.log('rooms : ',rooms);
  res.render('main', { rooms,title:'GIF채팅방'});
});


//채팅방화면
router.get('/room', function(req, res, next) {
  res.render('room', { title: '채팅방 생성' });
});

//방만들기
router.post('/room',async (req,res,next)=>{
  const io = req.app.get('io');
  
  //방생성

  const newRoom = {
    title:req.body.title,
    max:req.body.max,
    owner:req.session.color,
    password:req.body.password


  }
  
  const roomId = room.addRoom(newRoom);
  console.log('new Room@@ : ',newRoom);
  io.of('/room').emit('newRoom',newRoom);

  res.redirect(`/room/${roomId}?password=${req.body.password}`);

});


//방화면
router.get('/room/:id', function(req, res, next) {
  
  //id로 방찾기

console.log(typeof Number(req.params.id));

  
  const result = room.getRoom(Number(req.params.id));

  console.log('room result : ',result);
  if(!result){
    console.log('존재하지 않는 방입니다.');
    return res.redirect('/');
  }
  
  return res.render('chat',{
    result,
    title:result.title,
    chats:[],
    user:req.session.color
  });

});

router.delete('/room/:id',async(req,res,next)=>{

  room.removeRoom(Number(req.params.id));
  //채팅방삭제
  res.send('ok');
  setTimeout(()=>{
    req.app.get('io').of('/room').emit('removeRoom',req.params.id);

  },1000);

});

router.post('/room/:id/chat',async(req,res,next)=>{
  const chat = {
    room:req.params.id,
    user:req.session.color,
    chat:req.body.chat
  }

  req.app.get('io').of('/chat').to(req.params.id).emit('chat',chat);

  res.send('ok');
});

module.exports = router;
