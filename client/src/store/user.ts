import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userName = ref('')
  const highScores = ref<{ [gameName: string]: number }>({});

  // Loads the highscore from a user for a certain game
  async function loadHighScore(gameName: string) {
    try {
      const url = `http://localhost:8080/highscore/${gameName}/${userName.value}`;
      console.log('Requesting high score from:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to load high score: ${response.statusText}`);
      }

      const data = await response.json();
      highScores.value[gameName] = data.highScore;
    } catch (error) {
      console.error('Error loading high score:', error);
      highScores.value[gameName] = 0;
    }
  }

  // Saves the highscore for the game in a json format consisiting of userName, gameName and score
  async function saveHighScore(gameName: string, score: number) {
    try {
      const response = await fetch('http://localhost:8080/highscore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: userName.value, gameName, score }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save high score: ${response.statusText}`);
      }

      const data = await response.json();
      highScores.value[gameName] = data.highScore;
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  }

  // Loads all highscores for the given game
  async function loadHighScores(gameName: string): Promise<{ [userName: string]: number }> {
    try {
      const url = `http://localhost:8080/highscore/${gameName}`;
      console.log('Requesting all high scores from:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to load high scores: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`All high scores for ${gameName}:`, data.scores);
      return data.scores || {};
    } catch (error) {
      console.error('Error loading high scores:', error);
      return {};
    }
  }




  return {
    userName,
    highScores,
    saveHighScore,
    loadHighScore,
    loadHighScores,
  };
})
