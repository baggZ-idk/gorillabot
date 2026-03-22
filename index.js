require('dotenv').config({quiet: true})
const fs = require('fs')
const path = require('path')
const { Client, GatewayIntentBits, Collection } = require('discord.js')
const PlayFab = require('playfab-sdk/Scripts/PlayFab/PlayFab')
const PlayFabAdmin = require('playfab-sdk/Scripts/PlayFab/PlayFabAdmin')

PlayFab.settings.titleId = process.env.PLAYFAB_TITLE_ID
PlayFabAdmin.settings.developerSecretKey = process.env.PLAYFAB_SECRET_KEY

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.commands = new Collection()

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('clientReady', () => {
    console.log(client.user.tag)
})

client.on('messageCreate', async message => {
    if (!message.guild) return
    if (message.guild.id !== process.env.GUILD) return
    if (message.author.bot) return
    if (!message.content.startsWith('!')) return

    const args = message.content.slice(1).trim().split(', ')
    const cmd = args.shift().toLowerCase()

    const command = client.commands.get(cmd)
    if (!command) return

    try {
        await command.execute(message, args, client, PlayFabAdmin, process.env)
    } catch (e) {}
})

client.login(process.env.TOKEN)