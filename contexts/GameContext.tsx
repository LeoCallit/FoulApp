"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Player, GameData } from "@/types";

interface GameContextType {
  players: Player[];
  addPlayer: (name: string, team: "black" | "white") => void;
  removePlayer: (id: string) => void;
  addFoul: (playerId: string, quarter: number) => void;
  removeFoul: (playerId: string, quarter: number) => void;
  clearAllData: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = "basketball-foul-data";

export function GameProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从localStorage加载数据
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data: GameData = JSON.parse(stored);
        setPlayers(data.players || []);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // 保存数据到localStorage
  useEffect(() => {
    if (isLoaded) {
      const data: GameData = { players };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [players, isLoaded]);

  const addPlayer = (name: string, team: "black" | "white") => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      team,
      fouls: [0, 0, 0, 0, 0], // 初始化5节的犯规记录
    };
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const removePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const addFoul = (playerId: string, quarter: number) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === playerId) {
          const newFouls = [...p.fouls];
          newFouls[quarter] = (newFouls[quarter] || 0) + 1;
          return { ...p, fouls: newFouls };
        }
        return p;
      })
    );
  };

  const removeFoul = (playerId: string, quarter: number) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === playerId) {
          const newFouls = [...p.fouls];
          if (newFouls[quarter] > 0) {
            newFouls[quarter] = newFouls[quarter] - 1;
          }
          return { ...p, fouls: newFouls };
        }
        return p;
      })
    );
  };

  const clearAllData = () => {
    if (confirm("确定要清空所有数据吗?此操作不可恢复!")) {
      setPlayers([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <GameContext.Provider
      value={{
        players,
        addPlayer,
        removePlayer,
        addFoul,
        removeFoul,
        clearAllData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
