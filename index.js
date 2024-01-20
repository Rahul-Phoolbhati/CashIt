const { Console } = require("console");
const app = require("./app");
const connectDB = require("./db/db");
const conversasion = require("./models/conversasion");
const dotenv = require('dotenv').config();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


port = 3000;

let users = new Map();

const getUser = (id )=>{
    // console.log(users.get(id));
    return users.get(id);
}


io.on('connection', (socket) => {
    
    // io.to(socket.id).emit("oldMessages", data)

    socket.on('getBwMessages',async (data)=>{
        const convoD = await getAllMessages(data);
        // socket.emit('sendAllMessages',convoD);
        // console.log(convoD);
        if(!convoD) return;
        io.to(socket.id).emit('sendAllMessages',convoD.messages);
    })
    
    socket.on('addUser', userData=>{
        
        users.set(userData.userId,socket.id);
        // console.log(users.get(userData.userId));

    } );
    

    socket.on('sendMessage',(data)=>{
        // console.log(users);
        const user = getUser(data.receiverId);
        
        io.to(user).emit('getMessage',data);
        saveConv(data);
        

        // const convo = {
        //    members: [data.senderId,data.receiverId],

        // }
        // console.log(user);
    })

})

const getAllMessages = async (data)=>{
    const convo = await conversasion.findOne({members:{$all:[data.userId,data.recId]}});

    return convo;
}

const saveConv = async (data)=>{
    const convo = await conversasion.findOne({members:{$all:[data.senderId,data.receiverId]}});
    const arrel = {
        message: data.message,
        sender: data.senderId,
    }
        if(!convo){
            const newConvo = new conversasion({
                members:[data.senderId,data.receiverId],
                
                messages:[arrel],
            })
            await newConvo.save();
        } 
        else{
            // convo.messages.push(data.message);
            // convo.messages = [...convo.messages,data.message]
            // await convo.save();
            convo.messages.push(arrel);
            await convo.save();
        }

}



const start = async () =>{
    try{
        // console.log(process.env.MONGO_URI);
        await connectDB(process.env.MONGO_URI);
        server.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
    );
    } catch(err){
        console.log(err);
    }
}

module.exports = io;

start();