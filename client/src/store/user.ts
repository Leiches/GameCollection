import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userName = ref('')
  const highScores = ref<{ [gameName: string]: number }>({});


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



  return {
    userName,
    highScores,
    saveHighScore,
    loadHighScore,
  };
})
