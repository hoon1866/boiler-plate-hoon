const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require("./config/key");

const{ User } = require("./models/User");

//밑의 두 줄은 클라이언트에서 서버로 온 자료를
//분석해가져오는 것이 bodyparser인데,
//app.use를 통해 bodyparser에 옵션을 넣음
//application/x-www-form-urlencoded 타입의 데이터 을 가져올 수 있게함
app.use(bodyParser.urlencoded({extended: true}));
//aplication/json 타입의 데이터 을 가져올 수 있게함
app.use(bodyParser.json());



const mongoose = require('mongoose')
mongoose.connect( config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('안녕하세요?'))

//postman 쓸때 app.post로 post 리퀘스틀 사용한다는 것.
app.post('/register', (req, res) => {
  //회원 가입시 필요한 정보들을 client에서
  //가져오면 그것들을 데이터베이스에 넣어준다.

  //bodyparser 덕분에 client가 입력한 id/passwaord를 id:  /  pass:  형식으로 저장할 수 있게함 (req.body)
    const user = new User(req.body)
  //이제 몽고db에 저장할 코딩  user.save() 안에 콜백 코드를 짠다. 에러가 났을 때, json 형식으로 success: false와 err문장을 반환.
  //만약 에러가 안났다? userinfo를 저장하고,  json 형식으로 success true를 알려줌.
    user.save((err, userInfo) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).json({
        success: true
      })
    })
})



app.listen(port, () => console.log('Example app listening on port ${port}!'))
