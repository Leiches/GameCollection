import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '@/store/user';

// Tests whether the leaderboard works correctly
describe('useUserStore - Leaderboard Management', () => {
  let userStore: ReturnType<typeof useUserStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    userStore = useUserStore();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Creates mock values and loads them
  describe('loadHighScores', () => {
    it('should load all high scores successfully', async () => {
      const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ scores: { Alice: 120, Bob: 200 } }) };
      (global.fetch as vi.Mock).mockResolvedValue(mockResponse);

      const gameName = 'TestGame';
      const scores = await userStore.loadHighScores(gameName);

      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8080/highscore/${gameName}`);
      expect(scores).toEqual({ Alice: 120, Bob: 200 });
    });

    // Mocks a loading error
    it('should handle errors when loading all high scores', async () => {
      const mockError = new Error('Failed to load high scores');
      (global.fetch as vi.Mock).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error');

      const gameName = 'TestGame';
      const scores = await userStore.loadHighScores(gameName);

      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8080/highscore/${gameName}`);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading high scores:', mockError);
      expect(scores).toEqual({});
    });
  });
});
