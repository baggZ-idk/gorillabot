module.exports = {
    name: 'help',
    async execute(message) {
        return message.reply(`
## Playfab
- !ban, [PLAYER_ID], [TIME_IN_HOURS(0=PERMANENT)], [REASON]
- !giveseeds, [PLAYER_ID], [AMOUNT]
- !help
- !motd, [MESSAGE]
- !searchids [ID_PREFIX]
- !unban, [PLAYER_ID]
## Discord
- !kick [User_ID]
- !time [User_ID] [hours]
        `);
    }
}
