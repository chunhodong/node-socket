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
  //const newRoom = new Room(title,max,owner,password);

  // /room 네임스페이스에 연결된 모든 클라이언트에게 메시지 전송
  const newRoom = {
    title:req.body.title,
    

  }
  io.of('/room').emit('newRoom',);

  res.redirect(`/room${newRoom._id}?password=${req.body.password}`);

});


//방목록
router.get('/room/:id', function(req, res, next) {
  
  //id로 방찾기
  const room = findRoom(req.params.id);
  const io = req.app.get('io');

  if(!room){
    console.log('존재하지 않는 방입니다.');
    return res.redirect('/');
  }
  return res.render('chat',{
    room,
    title:room.title,
    chats:[],
    user:req.session.color
  });

});

router.delete('/room/:id',async(req,res,next)=>{

  //채팅방삭제
  res.send('ok');
  setTimeout(()=>{
    req.app.get('io').of('/room').emit('removeRoom',req.params.id);

  });

});

module.exports = router;
