const { Util, MessageEmbed } = require("discord.js");
const sendError = require("../error");

module.exports = {
  info: {
    name: "skip",
    description: "Melewati Musik Yang Sedang Di Putar",
    usage: "",
    aliases: ["s"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("Maaf,Anda Harus Berada Di Voice Channel!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Tidak Ada Musik Yang Bisa Di Lewati.", message.channel);
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Melanjutkan Musik!")
      .setColor("YELLOW")
      .setTitle("Musik DiHentikan!")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }
    message.react("✅")
  },
};
