module.exports = {
    name: 'searchids',
    async execute(message, args, client, PlayFabAdmin, env) {
        if (!message.member.roles.cache.has(env.PLAYFAB_ACCESS)) return message.reply("Nice try")

        if (args.length !== 1) return message.reply("Usage: `!searchids [ID_PREFIX]`");

        const prefix = args[0];
        const segmentId = env.ALL_PLAYERS_SEGMENT;

        try {
            let continuationToken = null;
            message.reply(`Searching for ID starting with ${prefix}`);

            do {
                const result = await new Promise((resolve, reject) => {
                    PlayFabAdmin.GetPlayersInSegment(
                        {
                            SegmentId: segmentId,
                            MaxBatchSize: 1000,
                            ContinuationToken: continuationToken
                        },
                        (err, result) => {
                            if (err) reject(err);
                            else resolve(result);
                        }
                    );
                });

                const match = result.data.PlayerProfiles.find(p => p.PlayerId.toUpperCase().startsWith(prefix.toUpperCase()));

                if (match) {
                    return message.reply(`Found player: \`${match.PlayerId}\``);
                }

                continuationToken = result.data.ContinuationToken;
            } while (continuationToken);

            message.reply(`No player found with ID starting with \`${prefix}\``);

        } catch (err) {
            console.error(err);
            message.reply("Error");
        }
    }
}