import { useUserStore } from "@/store/user";

export async function saveHighScore(gameName: string, score: number): Promise<void> {
  const userStore = useUserStore();

  try {
    await userStore.saveHighScore(gameName, score);
    console.log(`High score saved for ${gameName}: ${score}`);
  } catch (error) {
    console.error("Error saving high score:", error);
  }
}

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

export async function fetchLeaderboard(gameName: string): Promise<{ [userName: string]: number }> {
  const userStore = useUserStore();

  try {
    const scores = await userStore.loadHighScores(gameName); // Ensure this returns the scores object
    console.log("Leaderboard:", scores); // Log the response from `loadHighScores`
    return scores || {}; // Return an empty object if scores are undefined
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return {}; // Return an empty object on error
  }
}
