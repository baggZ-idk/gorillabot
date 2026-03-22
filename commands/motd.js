module.exports = {
    name: 'motd',
    async execute(message, args, client, PlayfabAdmin, env) {
        if (!message.member.roles.cache.has(env.PLAYFAB_ACCESS)) return message.reply("Nice try")

        if (args.length !== 1) return message.reply("Usage: \`!motd, [MESSAGE]\`");

        PlayfabAdmin.SetTitleData(
            {
                Key: env.MOTD_KEY,
                Value: args[0]
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return message.reply("Error");
                }
                message.reply(`Set MOTD to \`${args[0]}\``);
            }
        )
    }
}