'use strict';

const { MessageEmbed } = require("discord.js"),
      { ticketslogs } = require("../configs/channels.json"),
      { ticketsaccess } = require("../configs/roles.json");
module.exports = async(client, data) => {
    if(data.isMessageComponent()){
        if(data.isCommand()){
            client.emit('slashCommands',data)
        }
    }

    if (data.isButton()) {
        if (data.customId === "deleteMpTicket") {
            if (!data.channel.name.startsWith("🎫・ticket-")) return;
            if (!data.member.roles.has(ticketsaccess)) return data.author.send(`**${client.no} ➜ Vous n'avez pas l'autorisation de fermer ce ticket.**`)

            const user = await client.users.fetch(data.channel.topic),
                  channelLogs = client.channels.cache.get(ticketslogs);
            
            channelLogs.send({
                content: null,
                embeds: [
                    new MessageEmbed()
                    .setTitle(`Fermeture du ticket de ${user.username}#${user.discriminator}`)
                    .setTimestamp(new Date())
                    .setColor(client.color)
                    .addFields(
                        { name: `:id: ID :`, value: `\`\`\`${user.id}\`\`\``, inline: false },
                        { name: `:man_police_officer: Modérateur :`, value: `\`\`\`${data.user.username}#${data.user.discriminator}\`\`\``, inline: false }
                    )
                ]
            });

            await user.send({
                content: `> **🇫🇷 ➜ Votre ticket sur YopBot List à été fermé.\n> 🇺🇸 ➜ Your ticket on YopBot list has been closed.**`
            });
            data.channel.send(`**${client.yes} ➜ Fermeture du ticket dans 10 secondes...**`)
            return setTimeout(() => {
                data.channel.delete()
            }, 10000);
        }
    }
}