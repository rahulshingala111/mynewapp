/* eslint-disable */
const express = require('express')
const mongoose = require('mongoose')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const path = require('path')
const app = express()
const jose = require('jose')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const cors = require('cors')
app.use(cors())
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})
//Schema
const User = require('./Schema/User')
const Empl = require('./Schema/Employee')
const Proj = require('./Schema/Project')
const Work = require('./Schema/Work')

//-------- image upload
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  },
})
const upload = multer({ storage: storage })

//header origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Request-Headers', 'Set-Headers')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers,myheader,X-RapidAPI-Key, Authorization, X-Requested-With,Set-Headers',
  )
  next()
})

// idk
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))

//mongoose
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://0.0.0.0:27017/mynewappdb', {
  useNewUrlParser: true,
  //useCreateIndex: true,
  // useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

//#region ============================= Home     ================================
app.get('/hello', (req, res) => {
  res.sendStatus(200)
  console.log('welcome')
})

const checkUsername = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((post) => {
      if (post === null) {
        next()
      } else {
        console.log('user already exist')
        res.sendStatus(401)
      }
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(401)
    })
}
const checkEmail = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((post) => {
      if (post === null) {
        next()
      } else {
        console.log('email already exist')
        res.sendStatus(401)
      }
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(401)
    })
}

app.post('/register', checkUsername, checkEmail, (req, res) => {
  try {
    User.insertMany({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'employee',
    })
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(401)
  }
})

const checkUsername2 = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((post) => {
      if (post !== null) {
        next()
      } else {
        console.log('username wrong')
        res.sendStatus(401)
      }
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(401)
    })
}
const checkPassword2 = (req, res, next) => {
  User.findOne({ password: req.body.password })
    .then((post) => {
      if (post !== null) {
        next()
      } else {
        console.log('password wrong')
        res.sendStatus(401)
      }
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(401)
    })
}

app.post('/login', checkPassword2, checkUsername2, async (req, res) => {
  res.sendStatus(200)
})

//#endregion

//#region ============================= Dasboard ================================

const isAuthenticated = async (req, res, next) => {
  try {
    const secret = new TextEncoder().encode('rahulSecret')
    const jwt = req.headers.myheader
    const { payload } = await jose.jwtVerify(jwt, secret)
    try {
      User.findOne({ username: payload.username })
        .then((result) => {
          res.send(result.role)
          next()
        })
        .catch((error) => {
          console.log(error)
          res.sendStatus(401)
        })
    } catch (err) {
      console.log(err)
      res.sendStatus(403)
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(403)
  }
}

app.get('/dashboard', isAuthenticated, (req, res) => {})

//#endregion

//#region ============================= Employee ================================

app.post('/dashboard/employee/addemployee/registeruser', upload.single('file'), (req, res) => {
  Empl.findOne({ username: req.body.username, email: req.body.email }).then((result) => {
    if (result !== null) {
      res.sendStatus(401)
      console.log('Username or Email already exist')
    } else {
      User.findOne({ username: req.body.createdBy }).then((result) => {
        try {
          const createdBy = result._id
          Empl.insertMany({
            contact: req.body.contact,
            email: req.body.email,
            username: req.body.username,
            address: req.body.address,
            education: req.body.education,
            image: req.body.file,
            createdby: createdBy,
          })
          res.sendStatus(200)
        } catch (error) {
          res.sendStatus(401)
          console.log(error)
        }
      })
    }
  })
})

app.get('/dashboard/viewemployee/showuser', (req, res) => {
  Empl.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'createdby',
        foreignField: '_id',
        as: 'result',
      },
    },
  ])
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post('/dashboard/employee/addemployee/edituser', (req, res) => {
  Empl.findByIdAndUpdate(
    { _id: req.body.id },
    {
      contact: req.body.contact,
      email: req.body.email,
      username: req.body.username,
      education: req.body.education,
      address: req.body.address,
      file: req.body.file,
    },
  )
    .then((result) => {
      res.sendStatus(200)
    })
    .catch((err) => {
      res.sendStatus(401)
      console.log(err)
    })
})

//#endregion

//#region ============================= Project =================================
app.post('/dashboard/project/addproject/add', (req, res) => {
  Proj.findOne({ name: req.body.name }).then((result) => {
    if (result === null) {
      try {
        Proj.insertMany({
          name: req.body.name,
          date: req.body.date,
          state: req.body.state,
          description: req.body.description,
        })
        res.sendStatus(200)
      } catch (err) {
        console.log(err)
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401)
      console.log('Project already exist')
    }
  })
})

app.get('/dashboard/project/addproject/view', (req, res) => {
  Proj.find({}).then((result) => {
    if (result === null) {
      res.sendStatus(401)
      console.log('no data found')
    } else {
      res.send(result)
    }
  })
})
//#endregion

//#region ============================= Work ====================================
app.get('/dashboard/employee/work/addwork/viewdata', (req, res) => {
  try {
    Proj.find({}).then((result) => {
      res.send(result)
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(401)
  }
})

app.post('/dashboard/employee/work/addwork/adddata', async (req, res) => {
  try {
    await Work.insertMany({
      project: req.body.project,
      date: req.body.date,
      description: req.body.description,
      hour: req.body.hour,
      createdBy: req.body.createdBy,
    })
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(401)
  }
})

app.get('/dashboard/employee/work/viewwork', async (req, res) => {
  try {
    await Work.find({}).then((result) => {
      res.send(result)
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(401)
  }
})
app.post('/dashboard/employee/work/viewwork/filtered', async (req, res) => {
  try {
    await Work.find({ date: { $gte: req.body.sdate, $lte: req.body.edate } }).then((result) => {
      res.send(result)
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(401)
  }
})
app.get('/dashboard/employee/work/viewemployeework', async (req, res) => {
  Work.find({})
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(401)
    })
})

app.post('/dashboard/employee/work/viewemployeework/viewbyuser', async (req, res) => {
  Work.find({ createdBy: req.body.employee })
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(401)
    })
})
//#endregion

//#region ============================= Chat =====================================

app.get('/dashboard/chat/users', (req, res) => {
  try {
    User.find({})
      .then((response) => {
        res.send(response)
      })
      .catch((error) => {
        console.log(error)
        res.sendStatus(404)
      })
  } catch (error) {
    console.log(error)
    res.sendStatus(200)
  }
})

//-----------socket ------------

io.on('connection', (socket) => {
  console.log('user connected - ' + socket.id)

  socket.on('chat message', (msg) => {
    console.log('message :' + msg)
  })

  socket.on('join_room', (room) => {
    socket.join(room)
    console.log(`user ${socket.id} joined ${room} room`)
  })

  socket.on('send_message', (messageData) => {
    console.log(messageData)
    socket.to(messageData.username).emit('recieve_message', messageData)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})

server.listen(3001, () => {
  console.log('listening on ' + 3001)
})
//#endregion
const port = 5000
app.listen(port, () => {
  console.log(`Listening to Port ${port}`)
})
