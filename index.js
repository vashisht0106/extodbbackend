const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const multer = require('multer');


const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

// Connect to MongoDB
const url='mongodb+srv://modal:12301230@cluster0.hdgpi4p.mongodb.net/extodb'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log("database connected successfully done") })

const app = express();
app.use(express.json())
//app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Create a Mongoose schema and model for images
const botSchema = new mongoose.Schema({
  Name: String,
  FName: String,
  Email: String,
  MobileNo: String,
  HQ: String,
  Gender: String,
  Dob: String,
  ESkill: String,
  Mode: String,
  
  
});

const botModel = mongoose.model('bot', botSchema);

// Set up Express and multer for image upload
//const upload = multer({ dest: 'uploads/' });

  //const storage = multer.diskStorage({

  //  destination: function (req, file, cb) {
  //    cb(null, 'uploads')

  //  },
  //  filename: function (req, file, cb) {

  //    const add = Date.now() + file.originalname;
  //    cb(null, add)
      
  //  }



  //});


//  const upload = multer({ storage })
//app.post('/upload', upload.single('excelFile'), async (req, res) => {
//  //   Save the image to the database
//  const inputString=req.file.path;
//  const urlc=inputString.replace(/\\/g,'/');
//  const newImage = new ImageModel({
//    name: req.file.originalname,
//    url: urlc,
//    tags: req.body.tags || [],
//  });
//  await newImage.save();
//  res.status(201).send("file uploaded success");

//  console.log(req.file.path, req.file.originalname,urlc)
//});



app.get('/get', async(req, res) => {
const data= await botModel.find()
  res.status(200).json(data);
})




// Import the required libraries

// Replace 'YOUR_API_TOKEN' with the token you received from the BotFather
const Token = '6482995244:AAH_Opj7Tw6GiEW4o7G7wOIpXmEfxHaSbDs';
const bot = new TelegramBot(Token, { polling: true });



bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Handle menu items
  switch (messageText) {
    case '/start':
      sendMenu(chatId);
      break;
    case 'Training':
      handleOnline(chatId);
      break;
    case 'Option 2':
      handleOption2(chatId);
      break;
    case 'Option 3':
      handleOption3(chatId);
      break;
    case 'Option 4':
      handleOption4(chatId);
      break;


    default:
      // Echo back the received message
      bot.sendMessage(chatId, `Received: ${messageText}`);
  }
});













function sendMenu(chatId) {
  //const chatId = msg.chat.id;


  message = `Welcome! What would you like to do?`;

  const keyboard = {
    keyboard: [
      ['Training', 'Help?'],
      ['Software Solution', 'Student Login'],
    ],
    resize_keyboard: true, // Make the keyboard resize dynamically
    one_time_keyboard: true, // Hide the keyboard after a button is pressed
  };

  bot.sendMessage(chatId, message, { reply_markup: keyboard });

};


//function handleOption1(chatId){

//  const keyboard = {
//    keyboard: [
//      ['Online', 'Offline'],

//    ],
//    resize_keyboard: true, // Make the keyboard resize dynamically
//    one_time_keyboard: true, // Hide the keyboard after a button is pressed
//  };

//  bot.sendMessage(chatId ,'Please Select Your Mode!',{ reply_markup: keyboard });

//};





function  handleOnline(chatId) {
  bot.sendMessage(chatId, 'Enter Condidate Name', { reply_markup: { remove_keyboard: true } });

  bot.once('message', (msg) => {
    if (msg.chat.id === chatId) {
      const Name = msg.text;
      console.log('Name',Name)


bot.sendMessage(chatId,"Enter Father's Name:")

bot.once('message',(msg)=>{

if(msg.chat.id===chatId){

const FName=msg.text;










      bot.sendMessage(chatId, "Enter Email");

      // Wait for the next message (email) from the same user
      bot.once('message', (msg) => {
        if (msg.chat.id === chatId) {
          const Email = msg.text;
          console.log("Email",'Email')
          bot.sendMessage(chatId, "Enter Mobile Number:");

          // Wait for the next message (mobile number) from the same user
          bot.once('message', (msg) => {
            if (msg.chat.id === chatId) {
              const MobileNo = msg.text;

           

              bot.sendMessage(chatId, 'Highest Qualification:', )
              //bot.sendMessage(chatId, `Name: ${Name}\nEmail: ${Email}\nMobile Number: ${MobileNo}`);



              bot.once('message', (msg) => {

                if (msg.chat.id == chatId) {
                  const HQ = msg.text;            //Highest qualification
                  
                  const keyboard = {
                    keyboard: [
                      ['Female', 'Male'],

                    ],
                    resize_keyboard: true, // Make the keyboard resize dynamically
                    one_time_keyboard: true, // Hide the keyboard after a button is pressed
                  };
                  
                  
                  bot.sendMessage(chatId, 'Gender', { reply_markup: keyboard })
                  
                  bot.once('message',(msg)=>{
                 if(msg.chat.id===chatId){


                   const Gender=msg.text;
                   
                   
                  bot.sendMessage(chatId,'DOB(DDMMYYYY)')
                bot.once('message',(msg)=>{


if(msg.chat.id===chatId){


const Dob=msg.text;

                 
                


const keyboard = {
  keyboard: [
    ['Beginner', 'Moderate','Fluent'],

  ],
  resize_keyboard: true, // Make the keyboard resize dynamically
  one_time_keyboard: true, // Hide the keyboard after a button is pressed
};

bot.sendMessage(chatId, ' Select english communication skill', { reply_markup: keyboard })



bot.once('message', (msg) => {
  if (msg.chat.id == chatId) {

    const ESkill = msg.text;












                  
                  const keyboard = {
                    keyboard: [
                      ['Online', 'Offline'],

                    ],
                    resize_keyboard: true, // Make the keyboard resize dynamically
                    one_time_keyboard: true, // Hide the keyboard after a button is pressed
                  };

                  bot.sendMessage(chatId, 'Select Your Mode', { reply_markup: keyboard })



                  bot.once('message', (msg) => {
                    if (msg.chat.id == chatId) {

                      const Mode = msg.text;

                      const keyboard = {
                        keyboard: [
                          ['Yes', 'No'],
                    
                        ],
                        resize_keyboard: true, // Make the keyboard resize dynamically
                        one_time_keyboard: true, // Hide the keyboard after a button is pressed
                      };



                      bot.sendMessage(chatId, `Name:${Name}\nEmail:${Email}\nMobile No:${MobileNo}\nHighest Qualification:${HQ}\nMode:${Mode}\n\n\n if all are correct click on "Yes" otherwise click on "No"`, { reply_markup: keyboard })
                 

bot.once('message',async(msg)=>{

if(msg.chat.id==chatId ){

const text=msg.text;
console.log('text',text);
if(text=='Yes'){



  console.log('name',Name,Email,HQ,ESkill,FName,Dob,MobileNo)
  const newData = {
    Name,
    FName,
    Email,
    MobileNo,
    HQ,
    Gender,
    Dob,
    ESkill,
    Mode,
  };


 // Save data to the database
 const newBotData = new botModel(newData);

 try {
  await newBotData.save();
  bot.sendMessage(chatId, 'Registration successfully  Done!');
} catch (error) {
  console.error('Database save error:', error);
  bot.sendMessage(chatId, 'An error occurred while saving data to the database.');
}



}
else{

  bot.sendMessage(chatId,'/Training' ,{reply_markup:{remove_keyboard:true}});

}


}

})



}

}
)






                }

              })

            }
          });
        }
      });
      
    }})
    }}) 
      
  }}) 

}
})
 
}});
}



//bot.on('message', (msg) => {
//  const chatId = msg.chat.id;
//  const messageText = msg.text;

//  // Handle menu items
//  switch (messageText) {
//    case '/start':
//      sendMenu(chatId);
//      break;
//    case 'Training':
//      handleOnline(chatId);
//      break;
//    case 'Option 2':
//      handleOption2(chatId);
//      break;
//    case 'Option 3':
//      handleOption3(chatId);
//      break;
//    case 'Option 4':
//      handleOption4(chatId);
//      break;


//    default:
//      // Echo back the received message
//      bot.sendMessage(chatId, `Received: ${messageText}`);
//  }
//});
















bot.on('polling_error', (error) => {
  console.error(`Polling error: ${error.message}`);
});












// Start the server
const PORT = 443;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
