<script>
import HighScoreViewModel from '@/viewmodels/HighscoreViewModel';
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return{
        highscores: [],
        top4UserHighScores: [],
        user: null
    }
},
async created() {
  try {
    console.log("Test")
    const highscoreData = await HighScoreViewModel.getHighscores(this.userId);
    this.highscores = highscoreData
    this.top4UserHighScores = highscoreData
      .filter(score => Number(score.userid) === Number(this.userId))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching highscore data:', error);
  }
},
};
  </script>

<template>
    <div>
      <div>
        <h2>All High Scores</h2>
        <ol v-if="highscores && this.user" type="1">
          <li v-for="score in highscores" :key="score.userid">{{ score.score }}</li>
        </ol>
        <p v-else>Log in to see highscores.</p>
      </div>
      <div>
        <h2>Your Top 4 High Scores</h2>
        <ol v-if="top4UserHighScores && this.user" type="1">
          <li v-for="score in top4UserHighScores" :key="score.userid">{{ score.score }}</li>
        </ol>
        <p v-else>Log in to see personal highscores.</p>
      </div>
    </div>
  </template>
  