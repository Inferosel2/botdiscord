

// Important Features

const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const client = new Discord.Client();
const OwnerID = "332584469007695874"
 ;

// Settings

const TOKEN = "NDE3NzU5NzEzNTU2NTYxOTUx.DXXslA.w2tS1NCATuwVp-iSJYn67MM_mbA";
const PREFIX = ">"

// Audio

function play(connection, message) {
	var server = servers[message.guild.id];

	server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

	server.queue.shift();

	server.dispatcher.on("end", function() {
		if (server.queue[0]) play(connection, message);
		else connection.disconnect();
	});
}

// Clients

var bot = new Discord.Client();
var servers = {};


// Variables
 
// Startup

bot.on("ready", function(message) {
	console.log("[Bot] Currently setting game!")
	bot.user.setGame("with the " + PREFIX + "help command!", "http://twitch.tv/Inferosel")
	console.log("[Bot] Currently setting status!")
	bot.user.setStatus("online")
	console.log("[Bot] The current prefix is: " + PREFIX)
	console.log("[Bot] No errors were found or reporterd! :D")
	console.log("[Bot] Bot is now ready to serve members!");
});

// Bot Commands
// To Create A Bot Command, Start With message

bot.on("message", function(message) { 

	if (message.author.equals(bot.user)) return;
	if(message == `<@417759713556561951> prefix`) {
			let icon2 = bot.user.displayAvatarURL;
			let serverembed = new Discord.RichEmbed()
			.setDescription("**" + Prefix + "**")
			.setDescription(PREFIX)
			.setColor("0xFFFFF0")
			.setThumbnail(icon2)
			message.author.send(serverembed);
		}
	

	if (!message.content.startsWith(PREFIX)) return;

	var args = message.content.substring(PREFIX.length).split(" ");
	
	switch (args[0].toLowerCase()) {

	case "kick":
	if (message.channel === message.author.dmChannel) {
		let erroricon1 = bot.user.displayAvatarURL;
		let embed2 = new Discord.RichEmbed()
		.setDescription("**Error**")
		.setColor("0xfff760")
		.setThumbnail(erroricon1)
		.addBlankField(false)
		.addField("Error #1.", "Can not do action in direct message channels.")
		message.author.send(embed2);
	}else{
			if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");
			let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
			if(!kUser) return message.channel.send("Can't find user!");
			let kReason = args.join(" ").slice(22);
			if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");

			let kickEmbed = new Discord.RichEmbed()
			.setDescription("**Logs**")
			.setColor("0x8b95ff")
			.addBlankField(false)
			.setThumbnail(kUser.displayAvatarURL)
			.addField("Command", "Kick")
			.addBlankField(false)
			.addField("Member", `${kUser}`, true)
			.addField("Moderator", `<@${message.author.id}>`, true)		
			.addField("Channel", message.channel, true)	
			.addBlankField(false)
			.addField("Reason", kReason, false)
			.addField("Time", message.createdAt, false);
			let kickChannel = message.guild.channels.find(`name`, "moderator-logs");
			if(!kickChannel) return message.channel.send("Can't find the #moderator-logs channel, please make a channel called 'moderator-logs'.");

			message.guild.member(kUser).kick(kReason);
			kickChannel.send(kickEmbed);

			let embedicon2 = bot.user.displayAvatarURL;
			let embed4 = new Discord.RichEmbed()
			.setDescription("**Kick**")
			.setColor("0x8b95ff")
			.setThumbnail(embedicon2)
			.addBlankField(false)
			.addField("You had been kicked for:", kReason, true)
			.addBlankField(false)
			.addField("You had been kicked by:", message.author.tag, true)
			kUser.send(embed4);
	}
		break;
	case "warn":
		if (message.channel === message.author.dmChannel) {
			let erroricon1 = bot.user.displayAvatarURL;
			let errorembed1 = new Discord.RichEmbed()
			.setDescription("**Error**")
			.setColor("0xfff760")
			.setThumbnail(erroricon1)
			.addBlankField(false)
			.addField("Error #1.", "Can not do action in direct message channels.")
			message.channel.send(errorembed1);
		}else{
			if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do, pal!");
			
			let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
			if(!rUser) return message.channel.send("Couldn't find user.");
			let rreason = args.join(" ").slice(22);

			let reportEmbed = new Discord.RichEmbed()
			.setDescription("**Logs**")
			.setColor("0x8b95ff")
			.addBlankField(false)
			.setThumbnail(rUser.displayAvatarURL)
			.addField("Command", "Warn")
			.addBlankField(false)
			.addField("Member", `${rUser}`, true)
			.addField("Moderator", `${message.author}`, true)
			.addField("Channel", message.channel, true)
			.addBlankField(false)
			.addField("Reason", rreason)
			.addField("Time", message.createdAt);

			let reportschannel = message.guild.channels.find(`name`, "moderator-logs");
			if(!reportschannel) return message.channel.send("Can't find the #moderator-logs channel, please make a channel called 'moderator-logs'.");


			message.delete().catch(O_o=>{});
			reportschannel.send(reportEmbed);

			let embedicon = bot.user.displayAvatarURL;
			let embed3 = new Discord.RichEmbed()
			.setDescription("**Warn**")
			.setColor("0x8b95ff")
			.setThumbnail(embedicon)
			.addBlankField(false)
			.addField("You had been warned for:", rreason, true)
			.addBlankField(false)
			.addField("You had been warned by:", message.author.tag, true)
			rUser.send(embed3);
		}
		break;
	case "ban":
		if (message.channel === message.author.dmChannel) {
			let erroricon1 = bot.user.displayAvatarURL;
			let errorembed1 = new Discord.RichEmbed()
			.setDescription("**Error**")
			.setColor("0xfff760")
			.setThumbnail(erroricon1)
			.addBlankField(false)
			.addField("Error #1.", "Can not do action in direct message channels.")
			message.channel.send(errorembed1);
		}else{
			if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
			let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
			if(!bUser) return message.channel.send("Can't find user!");
			let bReason = args.join(" ").slice(22);
			if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be kicked!");
	
			let banEmbed = new Discord.RichEmbed()
			.setDescription("**Logs**")
			.setColor("0x8b95ff")
			.setThumbnail(bUser.displayAvatarURL)
			.addBlankField(false)
			.addField("Command", "Ban")
			.addBlankField(false)
			.addField("Member", `${bUser}`, true)
			.addField("Moderator", `${message.author}`, true)
			.addField("Channel", message.channel, true)
			.addBlankField(false)
			.addField("Reason", bReason)
			.addField("Time", message.createdAt);
	
			let incidentchannel = message.guild.channels.find(`name`, "moderator-logs");
			if(!incidentchannel) return message.channel.send("Can't find the #moderator-logs channel, please make a channel called 'moderator-logs'.");
	
			message.guild.member(bUser).ban(bReason);
			incidentchannel.send(banEmbed);
	
			let embedicon3= bot.user.displayAvatarURL;
			let embed5 = new Discord.RichEmbed()
			.setDescription("**Ban**")
			.setColor("0x8b95ff")
			.setThumbnail(embedicon3)
			.addBlankField(false)
			.addField("You had been banned for:", bReason, true)
			.addBlankField(false)
			.addField("You had been banned by:", message.author.tag, true)
			bUser.send(embed5);
		}
		break;
	case "serverinfo":
		if (message.channel === message.author.dmChannel) {
				let erroricon1 = bot.user.displayAvatarURL;
				let errorembed1 = new Discord.RichEmbed()
				.setDescription("**Error**")
				.setColor("0xfff760")
				.setThumbnail(erroricon1)
				.addBlankField(false)
				.addField("Error #1.", "Can not do action in direct message channels.")
				message.channel.send(errorembed1);
			}else{
			let sicon = message.guild.iconURL;
			let serverembed = new Discord.RichEmbed()
			.setDescription("**Server Information**")
			.setColor("0xd08cff")
			.setThumbnail(sicon)
			.addBlankField(false)
			.addField("Server Name", message.guild.name, true)
			.addField("Total Members", message.guild.memberCount, true)
			.addBlankField(false)
			.addField("Created On", message.guild.createdAt)
			.addBlankField(false)
			.addField("You Joined", message.member.joinedAt)
			message.channel.send(serverembed);
			}
			break;
	case "botinfo":
		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setDescription("**Bot Information**")
		.setColor("0xd08cff")
		.setThumbnail(bicon)
		.addBlankField(false)
		.addField("Bot Name", bot.user.username, true)
		.addBlankField(false)
		.addField("Bot Developer", "Zomraxor#2540")
		.addBlankField(false)
		.addField("Created On", bot.user.createdAt, false)
		message.channel.send(botembed);
		break;

// Shows a list of commands / Usage: ""
	case "help":
		if (message.channel === message.author.dmChannel) {
			let helpicon = bot.user.displayAvatarURL;
			let helpembed = new Discord.RichEmbed()
			.setDescription("**Help**")
			.setColor("0xf24e4e")
			.setThumbnail(helpicon)
			.addField(PREFIX + "help", "displays a list of commands.", false)
			.addField(PREFIX + "commands", "displays a list of commands.", false)
			message.author.send(helpembed);
			let helpicon2 = bot.user.displayAvatarURL;
			let helpembed2 = new Discord.RichEmbed()
			.setThumbnail(helpicon2)
			.setDescription("**Moderation**")
			.setColor("0x8b95ff")
			.addField(PREFIX + "ban", "bans a member. (#moderator-logs channel is required)", false)
			.addField(PREFIX + "kick", "kicks a member. (#moderator-logs channel is required)", false)
			.addField(PREFIX + "warn", "warns a member. (#moderator-logs channel is required)", false)
			message.author.send(helpembed2);
			let helpicon3 = bot.user.displayAvatarURL;
			let helpembed3 = new Discord.RichEmbed()
			.setThumbnail(helpicon3)
			.setDescription("**Messaging**")
			.setColor("0x90ff7a")
			.addField(PREFIX + "announce", "announces a message. (#announcements channel is required)", false)
			.addField(PREFIX + "poll", "creates a vote. (#polls channel is required)", false)
			message.author.send(helpembed3);
			let helpicon4 = bot.user.displayAvatarURL;
			let helpembed4 = new Discord.RichEmbed()
			.setThumbnail(helpicon4)
			.setDescription("**Information**")
			.setColor("0xd08cff")
			.addField(PREFIX + "userinfo", "shows information about a specific user.", false)
			.addField(PREFIX + "ownerinfo", "shows information about the server owner.", false)
			.addField(PREFIX + "serverinfo", "shows information about the server.", false)
			.addField(PREFIX + "botinfo", "shows information about the bot.", false)
			message.author.send(helpembed4);
			let helpicon5 = bot.user.displayAvatarURL;
			let helpembed5 = new Discord.RichEmbed()
			.setThumbnail(helpicon2)
			.setDescription("**Other**")
			.setColor("0xff8f63")
			.addField(PREFIX + "add", "add the bot to your own server!", false)
			.addField(PREFIX + "credits", "gives the bot developers credits.", false)
			message.author.send(helpembed5);
		}else{
			let helpicon = bot.user.displayAvatarURL;
			let helpembed = new Discord.RichEmbed()
			.setDescription("**Help**")
			.setColor("0xf24e4e")
			.setThumbnail(helpicon)
			.addField(PREFIX + "help", "displays a list of commands.", false)
			.addField(PREFIX + "commands", "displays a list of commands.", false)
			message.author.send(helpembed);
			let helpicon2 = bot.user.displayAvatarURL;
			let helpembed2 = new Discord.RichEmbed()
			.setThumbnail(helpicon2)
			.setDescription("**Moderation**")
			.setColor("0x8b95ff")
			.addField(PREFIX + "ban", "bans a member. (#moderator-logs channel is required)", false)
			.addField(PREFIX + "kick", "kicks a member. (#moderator-logs channel is required)", false)
			.addField(PREFIX + "warn", "warns a member. (#moderator-logs channel is required)", false)
			message.author.send(helpembed2);
			let helpicon3 = bot.user.displayAvatarURL;
			let helpembed3 = new Discord.RichEmbed()
			.setThumbnail(helpicon3)
			.setDescription("**Messaging**")
			.setColor("0x90ff7a")
			.addField(PREFIX + "announce", "announces a message. (#announcements channel is required)", false)
			.addField(PREFIX + "poll", "creates a vote. (#polls channel is required)", false)
			message.author.send(helpembed3);
			let helpicon4 = bot.user.displayAvatarURL;
			let helpembed4 = new Discord.RichEmbed()
			.setThumbnail(helpicon4)
			.setDescription("**Information**")
			.setColor("0xd08cff")
			.addField(PREFIX + "userinfo", "shows information about a specific user.", false)
			.addField(PREFIX + "ownerinfo", "shows information about the server owner.", false)
			.addField(PREFIX + "serverinfo", "shows information about the server.", false)
			.addField(PREFIX + "botinfo", "shows information about the bot.", false)
			message.author.send(helpembed4);
			let helpicon5 = bot.user.displayAvatarURL;
			let helpembed5 = new Discord.RichEmbed()
			.setThumbnail(helpicon2)
			.setDescription("**Other**")
			.setColor("0xff8f63")
			.addField(PREFIX + "add", "add the bot to your own server!", false)
			.addField(PREFIX + "credits", "gives the bot developers credits.", false)
			message.author.send(helpembed5);
			message.channel.send("Please check your DM's!")
		}
		break;

// Gives bot creators credit / Usage: ">credits"

	case "credits":
		let crediticon = bot.user.displayAvatarURL;
		let creditembed = new Discord.RichEmbed()
		.setDescription("**Credits**")
		.setColor("0xff8f63")
		.setThumbnail(crediticon)
		.addBlankField(false)
		.addField("Zomraxor#2540", "Developer", true)
		message.channel.send(creditembed);
		break;

// Shows a list of commands / Usage: ">commands"
		
	case "commands":
		if (message.channel === message.author.dmChannel) {
			let helpicon = bot.user.displayAvatarURL;
			let helpembed = new Discord.RichEmbed()
			.setDescription("**Help**")
			.setColor("0xf24e4e")
			.setThumbnail(helpicon)
			.addField(PREFIX + "help", "displays a list of commands.", false)
			.addField(PREFIX + "commands", "displays a list of commands.", false)
			message.author.send(helpembed);
			let helpicon2 = bot.user.displayAvatarURL;
			let helpembed2 = new Discord.RichEmbed()
			.setThumbnail(helpicon2)
			.setDescription("**Moderation**")
			.setColor("0x8b95ff")
			.addField(PREFIX + "ban", "bans a member. (#moderator-logs channel is required)", false)
			.addField(PREFIX + "kick", "kicks a member. (#moderator-logs channel is required)", false)
			.addField(PREFIX + "warn", "warns a member. (#moderator-logs channel is required)", false)
			message.author.send(helpembed2);
			let helpicon3 = bot.user.displayAvatarURL;
			let helpembed3 = new Discord.RichEmbed()
			.setThumbnail(helpicon3)
			.setDescription("**Messaging**")
			.setColor("0x90ff7a")
			.addField(PREFIX + "announce", "announces a message. (#announcements channel is required)", false)
			.addField(PREFIX + "poll", "creates a vote. (#polls channel is required)", false)
			message.author.send(helpembed3);
			let helpicon4 = bot.user.displayAvatarURL;
			let helpembed4 = new Discord.RichEmbed()
			.setThumbnail(helpicon4)
			.setDescription("**Information**")
			.setColor("0xd08cff")
			.addField(PREFIX + "userinfo", "shows information about a specific user.", false)
			.addField(PREFIX + "ownerinfo", "shows information about the server owner.", false)
			.addField(PREFIX + "serverinfo", "shows information about the server.", false)
			.addField(PREFIX + "botinfo", "shows information about the bot.", false)
			message.author.send(helpembed4);
			let helpicon5 = bot.user.displayAvatarURL;
			let helpembed5 = new Discord.RichEmbed()
			.setThumbnail(helpicon2)
			.setDescription("**Other**")
			.setColor("0xff8f63")
			.addField(PREFIX + "add", "add the bot to your own server!", false)
			.addField(PREFIX + "credits", "gives the bot developers credits.", false)
			message.author.send(helpembed5);
		}else{
			let helpicon = bot.user.displayAvatarURL;
			let helpembed = new Discord.RichEmbed()
			.setDescription("**Help**")
			.setColor("0xf24e4e")
			.setThumbnail(helpicon)
			.addField(PREFIX + "help", "displays a list of commands.", false)
			.addField(PREFIX + "commands", "displays a list of commands.", false)
			message.author.send(helpembed);
			let helpicon2 = bot.user.displayAvatarURL;
			let helpembed2 = new Discord.RichEmbed()
			.setThumbnail(helpicon2)
			.setDescription("**Moderation**")
			.setColor("0x8b95ff")
			.addField(PREFIX + "ban", "bans a member. (#moderator-logs channel is required)", false)
			.addField(PREFIX + "kick", "kicks a member. (#moderator-logs channel is required)", false)
			.addField(PREFIX + "warn", "warns a member. (#moderator-logs channel is required)", false)
			message.author.send(helpembed2);
			let helpicon3 = bot.user.displayAvatarURL;
			let helpembed3 = new Discord.RichEmbed()
			.setThumbnail(helpicon3)
			.setDescription("**Messaging**")
			.setColor("0x90ff7a")
			.addField(PREFIX + "announce", "announces a message. (#announcements channel is required)", false)
			.addField(PREFIX + "poll", "creates a vote. (#polls channel is required)", false)
			message.author.send(helpembed3);
			let helpicon4 = bot.user.displayAvatarURL;
			let helpembed4 = new Discord.RichEmbed()
			.setThumbnail(helpicon4)
			.setDescription("**Information**")
			.setColor("0xd08cff")
			.addField(PREFIX + "userinfo", "shows information about a specific user.", false)
			.addField(PREFIX + "ownerinfo", "shows information about the server owner.", false)
			.addField(PREFIX + "serverinfo", "shows information about the server.", false)
			.addField(PREFIX + "botinfo", "shows information about the bot.", false)
			message.author.send(helpembed4);
			let helpicon5 = bot.user.displayAvatarURL;
			let helpembed5 = new Discord.RichEmbed()
			.setThumbnail(helpicon2)
			.setDescription("**Other**")
			.setColor("0xff8f63")
			.addField(PREFIX + "add", "add the bot to your own server!", false)
			.addField(PREFIX + "credits", "gives the bot developers credits.", false)
			message.author.send(helpembed5);
			message.channel.send("Please check your DM's!")
		}
		break;

// Allows users to announce things if correct permissions / Usage: ">announce *String*"

	case "announce":
	if (message.channel === message.author.dmChannel) {
		let erroricon1 = bot.user.displayAvatarURL;
		let embed2 = new Discord.RichEmbed()
		.setDescription("**Error**")
		.setColor("0xfff760")
		.setThumbnail(erroricon1)
		.addBlankField(false)
		.addField("Error #1.", "Can not do action in direct message channels.")
		message.author.send(embed2);
	}else{
		let announcechannel = message.guild.channels.find(`name`, "announcements");
		if(!announcechannel) return message.channel.send("Can't find the #announcemnets channel, please make a channel called 'announcements'.");

		let announcement = args.join(" ").slice(8);
		
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Won't send announcement.");

		announcechannel.send("@here")

		let announceicon = bot.user.displayAvatarURL;
			let announceembed = new Discord.RichEmbed()
			.setDescription("**Announcement**")
			.setColor("0x90ff7a")
			.setThumbnail(announceicon)
			.addBlankField(false)
			.addField("Announcemnet:", announcement, true)
			.addBlankField(false)
			.addField("Announcer:", message.author.tag, true)
			announcechannel.send(announceembed);
	}
		break;
	case "userinfo":
		if (message.channel === message.author.dmChannel) {
			let erroricon1 = bot.user.displayAvatarURL;
			let errorembed1 = new Discord.RichEmbed()
			.setDescription("**Error**")
			.setColor("0xfff760")
			.setThumbnail(erroricon1)
			.addBlankField(false)
			.addField("Error #1.", "Can not do action in direct message channels.")
			message.channel.send(errorembed1);
		}else{
			let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
			if(!wUser) return message.channel.send("Can't find user!");
			let whoisicon = bot.user.displayAvatarURL;
			let whoisembed = new Discord.RichEmbed()
			.setDescription("**" + wUser.user.username + "**")
			.setColor("0xd08cff")
			.setThumbnail(wUser.user.avatarURL)
			.addBlankField(false)
			.addField("Join Date", wUser.joinedAt)
			.addBlankField(false)
			.addField("Create Date", wUser.user.createdAt)
			.addBlankField(false)
			.addField("Roles", wUser.roles.array(" "))
			message.channel.send(whoisembed)
		}
			break;

// Command that shows if the comamnd used is invalid.
	case "poll":
		if (message.channel === message.author.dmChannel) {
			let erroricon1 = bot.user.displayAvatarURL;
			let errorembed1 = new Discord.RichEmbed()
			.setDescription("**Error**")
			.setColor("0xfff760")
			.setThumbnail(erroricon1)
			.addBlankField(false)
			.addField("Error #1.", "Can not do action in direct message channels.")
			message.channel.send(errorembed1);
		}else{
			let pollchannel = message.guild.channels.find(`name`, "polls");
			if(!pollchannel) return message.channel.send("Can't find the #polls channel, please make a channel called 'polls'.");

			let votecontent = args.join(" ").slice(5);
			
			if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Won't send poll.");
			let pollembed = new Discord.RichEmbed()
			.setDescription("**Poll**")
			.setColor("0x90ff7a")
			.setThumbnail(bot.user.avatarURL)
			.addBlankField(false)
			.addField("Content", votecontent)
			.addBlankField(false)
			.addField("Host", message.author.username)
			pollchannel.send(pollembed).then(function (message) {
				message.react("🇽")
				message.react("✅")
			})}
		break;
	case "ownerinfo":
		if (message.channel === message.author.dmChannel) {
			let erroricon1 = bot.user.displayAvatarURL;
			let errorembed1 = new Discord.RichEmbed()
			.setDescription("**Error**")
			.setColor("0xfff760")
			.setThumbnail(erroricon1)
			.addBlankField(false)
			.addField("Error #1.", "Can not do action in direct message channels.")
			message.channel.send(errorembed1);
		}else{
			let ownerembed = new Discord.RichEmbed()
			.setDescription("**" + message.guild.owner.user.username + "**")
			.setColor("0xd08cff")
			.setThumbnail(message.guild.owner.user.avatarURL)
			.addBlankField(false)
			.addField("Create Date", message.guild.owner.user.createdAt)
			.addBlankField(false)
			.addField("Roles", message.guild.owner.roles.array(" "))
			message.channel.send(ownerembed)}
			break;
		case "add":
			let error26 = bot.user.displayAvatarURL;
			let embed7 = new Discord.RichEmbed()
			.setColor("0xff8f63")
			.setTitle("Click me to add the bot to your server!")
			.setURL("https://discordapp.com/api/oauth2/authorize?client_id=417759713556561951&permissions=8&scope=bot")
			message.channel.send(embed7);
			break;

	default: 
		let error22 = bot.user.displayAvatarURL;
		let embed6 = new Discord.RichEmbed()
		.setDescription("**Error**")
		.setColor("0xfff760")
		.setThumbnail(error22)
		.addBlankField(false)
		.addField("Error #2.", "Invalid command, please include the commands in >help.")
		message.channel.send(embed6);
		break;

// Ends Sequence

	};
	});

// Used To Log In

bot.login(TOKEN)
