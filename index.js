const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const tf = require('@tensorflow/tfjs')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

// Connect to MongoDB
mongoose.connect('mongodb+srv://modal:12301230@cluster0.hdgpi4p.mongodb.net/extodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log("database connected successfully done") })

const app = express();
app.use(express.json())
app.use('/uploads', express.static('uploads'));

// Create a Mongoose schema and model for images
const imageSchema = new mongoose.Schema({
  name: String,
  url: String,
  
});

const ImageModel = mongoose.model('excelFile', imageSchema);

// Set up Express and multer for image upload
//const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads')

  },
  filename: function (req, file, cb) {

    const add = Date.now() + file.originalname;
    cb(null, add)
    
  }



});


const upload = multer({ storage })
app.post('/upload', upload.single('excelFile'), async (req, res) => {
  //   Save the image to the database
  const inputString=req.file.path;
  const urlc=inputString.replace(/\\/g,'/');
  const newImage = new ImageModel({
    name: req.file.originalname,
    url: urlc,
    tags: req.body.tags || [],
  });
  await newImage.save();
  res.status(201).send("file uploaded success");

  console.log(req.file.path, req.file.originalname,urlc)
});



app.get('/upload', async(req, res) => {
const data= await ImageModel.find()
  res.status(200).json(data);
})


//// Image detection route
//app.post('/detect',upload.single('image'), async (req, res) => {
//  try {
//    // Process the uploaded image using TensorFlow.js
//    const imageBuffer = await sharp(req.file.buffer)
//      .resize({ width: 224, height: 224 })
//      .toBuffer();
//    console.log(imageBuffer)
//    // Load the pre-trained MobileNet model
//    const model = await mobilenet.load();


//    // Convert the image to a tensor
//    const imageTensor = tf.node.decodeImage(imageBuffer);

//    // Normalize and preprocess the image
//    const normalizedImage = tf.tidy(() => {
//      //const tensorImage = tf.browser.fromPixels(imageBuffer).toFloat();
//      const offset = tf.scalar(127.5);
//      return imageTensor.toFloat().sub(offset).div(offset).expandDims();
//    });

//    console.log(tensorImage)
//    // Run inference on the image
//    const predictions = await model.classify(normalizedImage);

//    // Get the top 5 predictions
//    //const topPredictions = Array.from(predictions.dataSync())
//    //  .map((score, index) => ({ score, index }))
//    //  .sort((a, b) => b.score - a.score)
//    //  .slice(0, 5);

//    // You can now send the top predictions as a response or save them in the database
//    res.status(200).json(predictions);
//  } catch (error) {
//    console.error('Error during image detection:', error);
//    res.status(500).json({ error: 'Error during image detection' });
//  }
//});




// Import the required libraries

// Replace 'YOUR_API_TOKEN' with the token you received from the BotFather
const Token = '6482995244:AAH_Opj7Tw6GiEW4o7G7wOIpXmEfxHaSbDs';
const bot = new TelegramBot(Token, { polling: true });
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

function handleOnline(chatId) {
  bot.sendMessage(chatId, 'Please Enter Your Name', { reply_markup: { remove_keyboard: true } });

  bot.once('message', (msg) => {
    if (msg.chat.id === chatId) {
      const Name = msg.text;
      bot.sendMessage(chatId, "Please Enter Your Email");

      // Wait for the next message (email) from the same user
      bot.once('message', (msg) => {
        if (msg.chat.id === chatId) {
          const Email = msg.text;
          bot.sendMessage(chatId, "Please Enter Your Mobile Number");

          // Wait for the next message (mobile number) from the same user
          bot.once('message', (msg) => {
            if (msg.chat.id === chatId) {
              const MobileNo = msg.text;

              const keyboard = {
                keyboard: [
                  ['BCA', 'MCA', "BA"],
                  ["BSc", "BCOM", "O"]

                ],
                resize_keyboard: true, // Make the keyboard resize dynamically
                one_time_keyboard: true, // Hide the keyboard after a button is pressed
              };

              bot.sendMessage(chatId, 'Select Your Stream', { reply_markup: keyboard })
              //bot.sendMessage(chatId, `Name: ${Name}\nEmail: ${Email}\nMobile Number: ${MobileNo}`);



              bot.once('message', (msg) => {

                if (msg.chat.id == chatId) {
                  const Stream = msg.text;
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



                      bot.sendMessage(chatId, `Name:${Name}\nEmail:${Email}\nMobileNo:${MobileNo}\nStream:${Stream}\nMode:${Mode}\n\n\n if all are correct click on "Yes" otherwise click on "No"`, { reply_markup: keyboard })
                 

bot.once('message',(msg)=>{

if(msg.chat.id==chatId ){

const text=msg.text;
console.log('text',text);
if(text=='Yes'){

  bot.sendMessage(chatId,'Account Creacted Succesfully Done!' ,{reply_markup:{remove_keyboard:true}});
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
    }
  });
}



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
















bot.on('polling_error', (error) => {
  console.error(`Polling error: ${error.message}`);
});












// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
