let TBot =  require('node-telegram-bot-api')
let axi = require('axios') 
let token ="6378292408:AAHCLX1ml56YTPOjS6y6sOP5QjfDdf5V99g"
let bot = new TBot(token,{polling:true})
bot.on('message', (message)=>{
let chatId=message.chat.id 
 
async function dictionary(){
   let word=message.text.toLowerCase() 
  let api=` https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  let raw ="", main =""
  try{
   raw = await axi.get(api)
   main=await raw.data
  let meaning = main[0].meanings[0].definitions[0].definition
  bot.sendMessage(chatId,`Meaning of ${message.text} : ${meaning} \n \n ${message.from.first_name} try this https://naipsouz.net/4/6142593 `)
  setTimeout(()=>{
     bot.sendMessage(chatId,"Input another word to get meaning")
  },1000)
  }catch(err){
     bot.sendMessage(chatId,"Could not find meaning 😩")
  }
}
let occ = message.text.search(/\s+/)
if(message.text=="/start"){
     bot.sendMessage(chatId,"Input a word to get meaning")
}
else if (occ==-1){
     dictionary()
}else{
     bot.sendMessage(chatId,'Input a correct word without space')
}
})