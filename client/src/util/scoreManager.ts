import { useUserStore } from "@/store/user";

/*
* For user references look at client/src/CrazyChicken/components/GameoverScreenComponent.vue
*/
//Needs game name and score and tries to save it via user.ts
export async function saveHighScore(gameName: string, score: number): Promise<void> {
  const userStore = useUserStore();

  try {
    await userStore.saveHighScore(gameName, score);
    console.log(`High score saved for ${gameName}: ${score}`);
  } catch (error) {
    console.error("Error saving high score:", error);
  }
}

// Just enter the game name and call it
// Used to load the highscore for a given game
export async function loadHighScore(gameName: string): Promise<number> {
  const userStore = useUserStore();

  try {
    await userStore.loadHighScore(gameName);
    const highScore = userStore.highScores[gameName] || 0;
    console.log(`High score loaded for ${gameName}: ${highScore}`);
    return highScore;
  } catch (error) {
    console.error("Error loading high score:", error);
    return 0;
  }
}

// Just enter the game name and call it
// Loads the highscore of all the users
export async function fetchLeaderboard(gameName: string): Promise<{ [userName: string]: number }> {
  const userStore = useUserStore();

  try {
    const scores = await userStore.loadHighScores(gameName);
    console.log("Leaderboard:", scores);
    return scores || {};
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return {};
  }
}
