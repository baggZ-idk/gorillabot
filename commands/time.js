module.exports = {
    name: 'time',
    async execute(message, args, client, PlayfabAdmin, env) {
        if (!message.member.roles.cache.contains(env.MODERATOR_ROLE)) return;


        const userId = args[0];
        const hours = parseFloat(args[1]);

        if (!userId || isNaN(hours)) {
            return message.reply('Usage: !time [User_ID] [hours]');
        }

        try {
            const member = await message.guild.members.fetch(userId);

            // Convert hours → milliseconds
            const duration = hours * 60 * 60 * 1000;

            await member.timeout(duration, `Timed out by ${message.author.tag}`);

            message.reply(`Timed out <@${userId}> for ${hours} hour(s).`);
        } catch (err) {
            console.error(err);
            message.reply('Failed to timeout user. Check the ID and permissions.');
        }
    }
};