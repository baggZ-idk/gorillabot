module.exports = {
    name: 'kick',
    async execute(message, args, client, PlayfabAdmin, env) {
        if (!message.member.roles.cache.has(env.MODERATOR_ROLE)) return;

        const userId = args[0];

        if (!userId) {
            return message.reply('Usage: !kick [User_ID]');
        }

        try {
            const member = await message.guild.members.fetch(userId);

            if (!member.kickable) {
                return message.reply('I cannot kick this user (role hierarchy issue).');
            }

            await member.kick(`Kicked by ${message.author.tag}`);

            message.reply(`Kicked <@${userId}>`);
        } catch (err) {
            console.error(err);
            message.reply('Failed to kick user. Check the ID and permissions.');
        }
    }
};