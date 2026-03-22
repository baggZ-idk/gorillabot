module.exports = {
    name: 'ban',
    async execute(message, args, client, PlayfabAdmin, env) {
        if (!message.member.roles.cache.has(env.PLAYFAB_ACCESS)) return message.reply("Nice try")

        if (args.length !== 3) return message.reply("Usage: \`!ban, [PLAYER_ID], [TIME_IN_HOURS(0=PERMANENT)], [REASON]\`");

        PlayfabAdmin.BanUsers(
            {
                Bans: [
                    {
                        PlayFabId: args[0],
                        DurationInHours: args[1],
                        Reason: args[2]
                    }
                ]
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return message.reply("Error");
                }
                message.reply(`Banned ${args[0]} for ${args[1]} hour because of ${args[2]}`);
            }
        )
    }
}