module.exports = {
    name: 'unban',
    async execute(message, args, client, PlayfabAdmin, env) {
        if (!message.member.roles.cache.has(env.PLAYFAB_ACCESS)) return message.reply("Nice try")

        if (args.length !== 1) return message.reply("Usage: \`!unban, [PLAYER_ID]\`");

        PlayfabAdmin.RevokeAllBansForUser(
            { PlayFabId: args[0] },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return message.reply("Error");
                }
                message.reply(`Unbanned ${args[0]}`);
            }
        )
    }
}