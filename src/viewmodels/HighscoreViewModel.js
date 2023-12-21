const serverUrl = 'http://localhost:9090';

export default {
    async getHighscores(){
        const token = localStorage.getItem('token');
        const gamesResponse = await fetch(`${serverUrl}/games?token=${token}`);

        if (gamesResponse.ok) {
            const gamesData = await gamesResponse.json();

            // Extract high scores from games data
            const highScoresData = gamesData.map(async (game) => {
                // Fetch username based on userid
                return {
                    gameid: game.id,
                    userid: game.user,
                    score: game.score,
                };
            });

            // Wait for all user data requests to complete
            const resolvedHighScoresData = await Promise.all(highScoresData);

            // Sort the high scores by score
            resolvedHighScoresData.sort((a, b) => b.score - a.score);

            return resolvedHighScoresData;
        }

    }
}