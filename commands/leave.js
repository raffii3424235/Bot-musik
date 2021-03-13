const { MessageEmbed } = require("discord.js");
const sendError = require("../error");

module.exports = {
    info: {
        name: "leave",
        aliases: ["goaway", "disconnect"],
        description: "Meninggalkan Voice Channel",
        usage: "Leave",
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("Maaf,Anda Harus Berada Di Voice Channel!", message.channel);
        if (!message.guild.me.voice.channel) return sendError("Saya Tidak Ada Di Semua Voice Channel!", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("Mencoba Untuk Keluar Dari Voice Channel...", message.channel);
        }

        const Embed = new MessageEmbed()
            .setAuthor("Good Bye...", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
            .setColor("GREEN")
            .setTitle("Success")
            .setDescription("🎶 Meninggalkan Voice Channel.")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("🎶 Meninggalkan Voice Channel"));
    },
};
