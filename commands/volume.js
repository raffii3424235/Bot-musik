const { MessageEmbed } = require("discord.js");
const sendError = require("../error");

module.exports = {
  info: {
    name: "volume",
    description: "Mengatur Volume Musik",
    usage: "[volume]",
    aliases: ["v", "vol"]
  },

  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return sendError(
        "Maaf,Anda Harus Berada Di Voice Channel!",
        message.channel
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return sendError("Tidak Ada Musik Yang Di Putar.", message.channel);
    if (!serverQueue.connection)
      return sendError("Tidak Ada Musik Yang Di Putar.", message.channel);
    if (!args[0])
      return message.channel.send(
        `The current volume is: **${serverQueue.volume}**`
      );
    if (isNaN(args[0]))
      return message.channel
        .send(":notes: Hanya Angka!")
        .catch(err => console.log(err));
    if (parseInt(args[0]) > 150 || args[0] < 0)
      return sendError(
        "Anda Tidak Bisa Mengatur Volume Di Atas 100 & Di Bawah 0",
        message.channel
      ).catch(err => console.log(err));
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
      .setDescription(`I set the volume to: **${args[0] / 1}/100**`)
      .setAuthor(
        "Volume Musik",
        "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif"
      )
      .setColor("BLUE");
    return message.channel.send(xd);
  }
};
