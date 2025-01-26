import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '@/store/user';

describe('useUserStore - High Score Management', () => {
  let userStore: ReturnType<typeof useUserStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    userStore = useUserStore();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('saveHighScore', () => {
    it('should save a high score successfully', async () => {
      const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ highScore: 100 }) };
      (global.fetch as vi.Mock).mockResolvedValue(mockResponse);

      const gameName = 'TestGame';
      const score = 100;

      await userStore.saveHighScore(gameName, score);

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/highscore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: '', gameName, score }),
      });
      expect(userStore.highScores[gameName]).toBe(100);
    });

    it('should handle errors when saving a high score', async () => {
      const mockError = new Error('Failed to save high score');
      (global.fetch as vi.Mock).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error');

      const gameName = 'TestGame';
      const score = 100;

      await userStore.saveHighScore(gameName, score);

      expect(global.fetch).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error saving high score:', mockError);
    });
  });

  describe('loadHighScore', () => {
    it('should load a high score successfully', async () => {
      const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ highScore: 150 }) };
      (global.fetch as vi.Mock).mockResolvedValue(mockResponse);

      const gameName = 'TestGame';
      await userStore.loadHighScore(gameName);

      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8080/highscore/${gameName}/`);
      expect(userStore.highScores[gameName]).toBe(150);
    });

    it('should handle errors when loading a high score', async () => {
      const mockError = new Error('Failed to load high score');
      (global.fetch as vi.Mock).mockRejectedValue(mockError);

      const consoleErrorSpy = vi.spyOn(console, 'error');

      const gameName = 'TestGame';
      await userStore.loadHighScore(gameName);

      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8080/highscore/${gameName}/`);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading high score:', mockError);
      expect(userStore.highScores[gameName]).toBe(0);
    });
  });
});
