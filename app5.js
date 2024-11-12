const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  let w;
  if(cpu === 'パー'){
    if(hand === 'グー') w = 0;
    else if(hand === 'チョキ') w = 2;
    else if(hand === 'パー') w = 1;
    else w = 3
  }else if(cpu === 'グー'){
    if(hand === 'チョキ') w = 0;
    else if(hand === 'パー') w = 2;
    else if(hand === 'グー') w = 1;
    else w = 3
  }else if(cpu === 'チョキ'){
    if(hand === 'パー') w = 0;
    else if(hand === 'グー') w = 2;
    else if(hand === 'チョキ') w = 1;
    else w = 3
  };

  let judgement;
  if(w === 2){
    judgement = '勝ち';
    win += 1;
    total += 1;
  }else if(w === 1){
    judgement = 'あいこ';
    total += 1;
  }else if(w === 0){
    judgement = '負け';
    total += 1;
  }else{
    judgement = 'error';
  };
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/kaburuna", (req, res) => {
  let color = req.query.color;
  let suc = Number( req.query.suc );
  let total = Number( req.query.total );
  console.log( {color, suc, total});
  const num = Math.floor( Math.random() * 4 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '赤';
  else if( num==2 ) cpu = '青';
  else if( num==3 ) cpu = '黄';
  else cpu = '緑';

  let w;
  if(cpu === '赤'){
    if(color === '赤') w = 0;
    else w = 1
  }else if(cpu === '青'){
    if(color === '青') w = 0;
    else w = 1
  }else if(cpu === '黄'){
    if(color === '黄') w = 0;
    else w = 1
  }else if(cpu === '緑'){
    if(color === '緑') w = 0;
    else w = 1
  };

  let judgement;
  if(w === 1){
    judgement = '成功';
    suc += 1;
    total += 1;
  }else{
    judgement = '失敗';
    total += 1;
  };
  const display = {
    your: color,
    cpu: cpu,
    judgement: judgement,
    suc: suc,
    total: total
  }
  res.render( 'kaburuna', display );
});

app.get("/fortune", (req, res) => {
  let nums = req.query.nums;
  let suc = Number( req.query.suc );
  let total = Number( req.query.total );
  console.log( {nums, suc, total});
  const num = Math.floor( Math.random() * 6 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '1';
  else if( num==2 ) cpu = '2';
  else if( num==3 ) cpu = '3';
  else if( num==4 ) cpu = '4';
  else if( num==5 ) cpu = '5';
  else cpu = '6';

  let n;
  if(cpu === '1'){
    if(nums === '1') n = 1;
    else if(nums === '6') n = 2;
    else n = 0
  }else if(cpu === '2'){
    if(nums === '2') n = 1;
    else n = 0
  }else if(cpu === '3'){
    if(nums === '3') n = 1;
    else n = 0
  }else if(cpu === '4'){
    if(nums === '4') n = 1;
    else n = 0
  }else if(cpu === '5'){
    if(nums === '5') n = 1;
    else n = 0
  }else if(cpu === '6'){
    if(nums === '6') n = 1;
    else if(nums === '1') n = 2;
    else n = 0
  };

  let judgement;
  if(n === 0){
    judgement = '失敗';
    total += 1;
  }else if(n === 1){
    judgement = '成功';
    suc += 1;
    total += 1;
  }else if(n === 2){
    judgement = '大失敗';
    total += 1;
  };

  const display = {
    your: nums,
    cpu: cpu,
    judgement: judgement,
    suc: suc,
    total: total
  }
  res.render( 'fortune', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
