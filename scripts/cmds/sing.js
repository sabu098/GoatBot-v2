      attachment: await Promise.all(thumbnails)
    },event.threadID, (err, info) => {
global.GoatBot.onReply.set(info.messageID, {
        commandName:sing ,
        messageID: info.messageID,
        author: event.senderID,
        result
      });
    },event.messageID);
  },
  onReply: async ({ event, api, Reply }) => {
    try {
    const { result } = Reply;
    const choice = parseInt(event.body);
    if (!isNaN(choice) && choice <= result.length && choice > 0) {
      const infoChoice = result[choice - 1];
      const idvideo = infoChoice.id;
  const { data: { title, downloadLink } } = await axios.get(`${await baseApiUrl()}/ytDl2?link=https://m.youtube.com/watch?v=${idvideo}&format=mp3`);
    await api.unsendMessage(Reply.messageID)
        await  api.sendMessage({
          body: title,
          attachment: await dipto(downloadLink,'audio.mp3')
        },event.threadID,event.messageID)
    } else {
      api.sendMessage("Invalid choice. Please enter a number between 1 and 6.",event.threadID,event.messageID);
    }
    } catch (error) {
      console.log(error);
      api.sendMessage("⭕ Sorry, audio size was less than 26MB",event.threadID,event.messageID)
    }   
 }
};
async function dipto(url,pathName) {
  try {
    const response = await axios.get(url,{
      responseType: "stream"
    });
    response.data.path = pathName;
    return response.data;
  }
  catch (err) {
    throw err;
  }
}
async function getVideoInfo(url) {
  //pore korbo😋.
