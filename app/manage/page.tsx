"use client";

import { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import Link from "next/link";
import { Player } from "@/types";

export default function ManagePage() {
  const { players, addFoul, removeFoul, clearAllData } = useGame();
  const [selectedQuarter, setSelectedQuarter] = useState(0);

  const blackPlayers = players.filter((p) => p.team === "black");
  const whitePlayers = players.filter((p) => p.team === "white");

  const quarters = ["第1节", "第2节", "第3节", "第4节", "第5节"];

  const getTotalFouls = (player: Player) => {
    return player.fouls.reduce((sum, count) => sum + count, 0);
  };

  const PlayerCard = ({ player }: { player: Player }) => {
    const totalFouls = getTotalFouls(player);
    const currentFouls = player.fouls[selectedQuarter] || 0;
    const isHighFoul = totalFouls >= 5; // 5次犯规警告

    return (
      <div
        className={`rounded-lg p-2.5 transition-all ${
          player.team === "black"
            ? "bg-slate-800 text-white"
            : "bg-white text-slate-800 border-2 border-slate-200"
        } ${isHighFoul ? "ring-2 ring-red-500" : ""}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm truncate">{player.name}</h3>
            <p
              className={`text-xs ${
                player.team === "black" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              总: {totalFouls}次
              {isHighFoul && <span className="ml-1 text-red-500">⚠️</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1">
          <button
            onClick={() => removeFoul(player.id, selectedQuarter)}
            disabled={currentFouls === 0}
            className={`w-10 h-10 rounded-lg font-bold text-xl transition-all active:scale-95 ${
              player.team === "black"
                ? "bg-slate-700 hover:bg-slate-600 disabled:bg-slate-900 disabled:opacity-30"
                : "bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:opacity-30"
            } ${currentFouls === 0 ? "cursor-not-allowed" : ""}`}
          >
            -
          </button>

          <div className="flex-1 text-center">
            <div
              className={`text-3xl font-bold ${
                currentFouls >= 3 ? "text-red-500" : ""
              }`}
            >
              {currentFouls}
            </div>
          </div>

          <button
            onClick={() => addFoul(player.id, selectedQuarter)}
            className={`w-10 h-10 rounded-lg font-bold text-xl transition-all active:scale-95 ${
              player.team === "black"
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  if (players.length === 0) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">🏀</div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            还没有球员
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            请先创建球员后再进行犯规记录
          </p>
          <Link
            href="/create"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg active:scale-95 transition-all"
          >
            前往创建球员
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* 顶部导航 */}
      <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 首页
        </Link>
        <button
          onClick={clearAllData}
          className="text-red-600 dark:text-red-400 hover:underline text-sm"
        >
          清空所有数据
        </button>
      </div>

      {/* 标题 */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          📊 犯规记录
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          当前: {quarters[selectedQuarter]}
        </p>
      </div>

      {/* 节次选择器 */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-2">
          <div className="grid grid-cols-5 gap-2">
            {quarters.map((quarter, index) => (
              <button
                key={index}
                onClick={() => setSelectedQuarter(index)}
                className={`py-3 px-2 rounded-xl font-semibold transition-all ${
                  selectedQuarter === index
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {quarter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 球员列表 - 左右分栏 */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {/* 左侧 - 黑队 */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-1 sticky top-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-2 z-10">
              <span>⚫</span>
              <span>黑队</span>
            </h2>
            <div className="space-y-2">
              {blackPlayers.length > 0 ? (
                blackPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))
              ) : (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                  暂无球员
                </div>
              )}
            </div>
          </div>

          {/* 右侧 - 白队 */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-1 sticky top-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-2 z-10">
              <span>⚪</span>
              <span>白队</span>
            </h2>
            <div className="space-y-2">
              {whitePlayers.length > 0 ? (
                whitePlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))
              ) : (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center text-sm text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700">
                  暂无球员
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 底部统计 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">
              {blackPlayers.reduce((sum, p) => sum + getTotalFouls(p), 0)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              ⚫ 黑队总犯规
            </div>
          </div>
          <div className="border-l border-slate-300 dark:border-slate-600"></div>
          <div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">
              {whitePlayers.reduce((sum, p) => sum + getTotalFouls(p), 0)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              ⚪ 白队总犯规
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
