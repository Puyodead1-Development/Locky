const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
//const config = require("./config.json");
let botAdmins = [
  "213247101314924545",
  "117416038982746112",
  "518943345054318603"
];
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (botAdmins.indexOf(msg.author.id) > -1) {
    if (msg.content.toLowerCase() === "l!lift") {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`Lifting Lockdown!`)
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown lift started by ${msg.author.username}!`);
      msg.channel.send(embed);
      msg.channel
        .createInvite()
        .then(invite =>
          msg.channel.send(
            new Discord.RichEmbed()
              .setAuthor(client.user.username, client.user.avatarURL)
              .setDescription(`New Invite Created!`)
              .addField("Invite", `https://discord.gg/${invite.code}`, true)
              .setTimestamp()
              .setColor("#FF0000")
              .setFooter(`Lockdown lift started by ${msg.author.username}!`)
          )
        )
        .catch(console.error);
      msg.guild.members.forEach(member => {
        if (botAdmins.indexOf(member.id) > -1) return;
        member.roles.forEach(role => {
          member
            .removeRoles(member.roles)
            .then(() => {
              member
                .addRole("518697412295131136")
                .catch(err =>
                  console.log(`[ERROR]: ${err} : ${member.user.username}`)
                );
            })
            .catch(err =>
              console.log(`[ERROR]: ${err} : ${member.user.username}`)
            );
        });
      });
      let lockdownRoleRemovedEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`Lockdown Role removed from all members!`)
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown lift started by ${msg.author.username}!`);
      msg.channel.send(lockdownRoleRemovedEmbed);
      let lockdownLifted = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`Lockdown Lifted!`)
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown lift started by ${msg.author.username}!`);
      msg.channel.send(lockdownLifted);
      msg.guild.setIcon("./tcop.png");
      msg.guild.setName("The Church of Pyrocynical");
      msg.guild.setVerificationLevel(2, "Lockdown Mode Lifted");
      return msg.guild
        .setSplash("./tcop.png")
        .then(console.log("Splash changed"))
        .catch(console.error);
    } else if (msg.content.toLowerCase() === "l!start") {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`Starting Lockdown!`)
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown started by ${msg.author.username}!`);
      msg.channel.send(embed);
      msg.guild.setIcon("./lock.jpg");
      msg.guild.setName("Lockdown Mode");
      msg.guild.setVerificationLevel(4, "Lockdown Mode");
      msg.guild
        .setSplash("./lock.jpg")
        .then("Splash Changed")
        .catch(console.error);
      msg.guild.fetchInvites().then(invite => {
        invite.deleteAll();
        let deletedInvitesEmbed = new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setDescription(`Revoked all Invites!`)
          .setTimestamp()
          .setColor("#FF0000")
          .setFooter(`Lockdown started by ${msg.author.username}!`);
        msg.channel.send(deletedInvitesEmbed);
      });
      msg.guild.members.forEach(member => {
        if (botAdmins.indexOf(member.id) > -1) return;
        member.roles.forEach(role => {
          member
            .removeRoles(member.roles)
            .then(() => {
              member.addRole("518949928962359306").catch(err => {
                console.log("[ERROR]");
              });
            })
            .catch(err => {
              console.log(`[ERROR]: ${err} : ${member.user.username}`);
            });
        });
      });
      let lockdownRoleAddedEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(
          `All non-admin members have been given the Lockdown Role!`
        )
        .setTimestamp()
        .setColor("#FF0000")
        .setFooter(`Lockdown started by ${msg.author.username}!`);
      msg.channel.send(lockdownRoleAddedEmbed);
    }
  }
});

//client.login(config.token);
client.login(process.env.CLIENT_TOKEN);
