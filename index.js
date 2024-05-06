const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth(),
  });

client.initialize();

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true });
// });

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async message => {
    if(message.body.toLowerCase() === 'hi' || message.body.toLowerCase() === 'hii' || message.body.toLowerCase() === 'hello') {
        message.reply('hello!!!');
    }
    else if(message.body.toLowerCase() === 'good morning') {
        message.reply('good morning! have a nice day');
    }
    else if(message.body.toLowerCase() === 'can you send a meme?') {
        const meme = await axios("https://api.imgflip.com/get_memes")
        .then(res=>res.data)
        const memes = meme.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        // console.log(randomMeme.url);
        client.sendMessage(message.from,await MessageMedia.fromUrl(randomMeme.url))
    }
    else if(message.body.toLowerCase() === 'can you send a joke?') {
        const joke = await axios("https://v2.jokeapi.dev/joke/Any")
        .then(res=>res.data)

        const msg=await client.sendMessage(message.from,joke.setup || joke.joke)
        if(joke.delivery) setTimeout(function(){
            msg.reply(joke.delivery)
        },5000)
    }
    else if(message.body.toLowerCase() === 'how is your day?') {
        message.reply('Yeah!Its hardly nice!!');
    }
    else if(message.body.toLowerCase() === 'have you done your breakfast?' || message.body.toLowerCase() === 'have you done your lunch?' || message.body.toLowerCase() === 'have you done your dinner?') {
        message.reply('Yeah!! what about you?');
    }
    else if(message.body.toLowerCase() === 'yeah!! what about you?') {
        message.reply('Yeah');
    }
    else if(message.body.toLowerCase() === 'bye') {
        message.reply('Bye! have a great day!');
    }
    // else{
    //     message.reply('Please ask valid question!!');
    // }   
});
