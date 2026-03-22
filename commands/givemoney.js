module.exports = {
    name: 'givemoney',
    async execute(message, args, client, PlayfabAdmin, env) {
        if (!message.member.roles.cache.has(env.PLAYFAB_ACCESS)) return message.reply("Nice try")

        if (args.length !== 2) return message.reply("Usage: \`!givemoney, [PLAYER_ID], [AMOUNT]\`");

        PlayfabAdmin.AddUserVirtualCurrency(
            {
                Amount: args[1],
                PlayFabId: args[0],
                VirtualCurrency: env.CURRENCY_CODE
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return message.reply("Error");
                }
                message.reply(`Added ${args[1]} dollar to user ${args[0]}`);
            }
        )
    }
}