require("express")().listen(1343); //çalmak suçtur

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("Nzc0NTkwNTY2MjM5MTc0Njc3.X6Z_rg.02AklDWn0O-gBCNF5KGT0tUcPjs");
const fetch = require("node-fetch"); // https://www.youtube.com/channel/UCJumIoZUVkhTx_XMxpG0_qQ?view_as=subscriber
const fs = require("fs");

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    // proje lisanslıdır LICENSE.md
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Başarıyla Pinglendi."); // dava etme hakkıma sahipim
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

client.on("ready", () => {
  client.user.setActivity(
    `v!ekle | ${client.guilds.size} Sunucuya Hizmet Veriyorum| Bot Sıfırlandı| v!yardım`
  );
  console.log(`Logined`);
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "v!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send(" Zaten Eklenmiş!");
        message.channel.send(" Başarılı!");
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(
          "Bir Show Linki Eklmeniz Gerekmektedir" + e
        );
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "v!botsay") {
    var link = spl[1];
    message.channel.send(`**${db.get("linkler").length} / 1000**`);
  }
});

const Discord = require("discord.js");

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "v!yardım") {
    let embed = new Discord.RichEmbed()
      .setColor("#070706")
      .setDescription(
        `‼**Uptime komudunu kullandıktan sonra sisteme eklenmesi için 1-5 dk bekleyin.**

 🔱**v!yardım** : Botun yardım menüsünü açar.
 🔰**v!ekle <link>** : Eklediğiniz proje linkini 7/24 açık yapar.
⚜**v!botsay** : Bot'umuzla uptime olan proje sayısını gösterir.
🔆**v!uptime-nedir** : Bot'un ne işe yaradığını gösterir.
**v!ping**: Bot'un Pingini Gösterir.
**v!avatar** : Etiketlediğiniz Veya Keni Profil Fotoğrafınızı Gösterir.
**v!sunucu-pp: Sunucunuzun PP sini Gösterir.
📥**Botun Davet Linki İçin** [TIKLA](https://discord.com/api/oauth2/authorize?client_id=774590566239174677&permissions=8&scope=bot) \n🔶**Destek Sunucusu İçin** [TIKLA](https://discord.gg/4h5Ser9dXc)`
      )
      .setAuthor(`Vayzr Uptime Bot | Yardım Menüsü`, client.user.avatarURL)
      .setFooter(`Vayzr Uptime Bot`);
    return message.channel.send(embed);
  }
});
const log = message => {
  console.log(`${message}`);
};

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "v!uptime-nedir") {
    var link = spl[1];
    message.channel.send(
      `**Vayzr Uptime Bot \n Botunuzu 7/24 Yapmanızı Sağlar**`
    );
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "v!ping") {
    var link = spl[1];
    const embed = new Discord.RichEmbed();
    embed.setColor("RANDOM");
    embed.addField(`**Pingim** `, ` **${client.ping}**`);

    message.channel.send({ embed: embed });
  }
});

client.on("ready", () => {
  client.channels.get("783257865707847680").join();
});

client.on("message", async message => {
  if (!message.content.startsWith("v!eval")) return;
  if (!["484297876697251872", "484297876697251872"].includes(message.author.id))
    return;
  var args = message.content.split("v!eval")[1];
  if (!args) return message.channel.send("<:asuna_no:732219380795965471> ..");

  const code = args;

  function clean(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 3 });
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }

  var evalEmbed = "";
  try {
    var evaled = await clean(await eval(await code));
    if (evaled.constructor.name === "Promise")
      evalEmbed = `\`\`\`\n${evaled}\n\`\`\``;
    else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``;

    if (evaled.length < 1900) {
      message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
    } else {
      var hast = await require("hastebin-gen")(evaled, {
        url: "https://hasteb.in"
      });
      message.channel.send(hast);
    }
  } catch (err) {
    message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
  }
});

client.on("message", message => {
    if (message.author.bot) return;
    var spl = message.content.split(" ");
    if (spl[0] == "v!avatar") {
            let üye = message.mentions.members.first();
            if(!üye) {
              let embed = new Discord.RichEmbed()
                .setAuthor(`${message.author.tag} Avatar`, message.author.avatarURL)
                .setImage(message.author.avatarURL)
                .setFooter("Vayzr Uptime Bot")
                .setTimestamp()
                .setColor("GOLD")
              message.channel.send(embed)
            }
            if(üye) {
              let embed = new Discord.RichEmbed()
                .setAuthor(`${üye.user.tag} Avatar`, üye.user.avatarURL)
                .setImage(üye.user.avatarURL)
                .setFooter("Vayzr Uptime Bot")
                .setTimestamp()
                .setColor("DARKBLUE")
              message.channel.send(embed)
            }
          };
    }
  );

client.on("message", message => {
    if (message.author.bot) return;
    var spl = message.content.split(" ");
    if (spl[0] == "v!sunucu-pp") {
        const rei= new Discord.RichEmbed()

.setDescription(`**İşte suunucunun pp si**`)
.setImage(`${message.guild.iconURL} `)
.setTimestamp()

message.channel.send(rei)
};

    }
  );