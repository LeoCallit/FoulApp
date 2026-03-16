"use client";

import { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import Link from "next/link";

export default function CreatePage() {
  const { players, addPlayer, removePlayer } = useGame();
  const [name, setName] = useState("");
  const [team, setTeam] = useState<"black" | "white">("black");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addPlayer(name.trim(), team);
      setName("");
    }
  };

  const blackPlayers = players.filter((p) => p.team === "black");
  const whitePlayers = players.filter((p) => p.team === "white");

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* 顶部导航 */}
      <div className="max-w-2xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 返回首页
        </Link>
      </div>

      {/* 主内容 */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
          ➕ 创建球员
        </h1>

        {/* 添加球员表单 */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="space-y-4">
            {/* 姓名输入 */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                球员姓名
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="请输入球员姓名"
                required
              />
            </div>

            {/* 队伍选择 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                队伍类型
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTeam("black")}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                    team === "black"
                      ? "bg-slate-800 text-white shadow-lg scale-105"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  ⚫ 黑队
                </button>
                <button
                  type="button"
                  onClick={() => setTeam("white")}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                    team === "white"
                      ? "bg-white text-slate-800 shadow-lg scale-105 border-2 border-slate-300"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  ⚪ 白队
                </button>
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              ➕ 添加球员
            </button>
          </div>
        </form>

        {/* 球员列表 */}
        <div className="space-y-4">
          {/* 黑队 */}
          {blackPlayers.length > 0 && (
            <div className="bg-slate-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>⚫</span>
                <span>黑队 ({blackPlayers.length}人)</span>
              </h2>
              <div className="space-y-2">
                {blackPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between bg-slate-700 rounded-xl p-3"
                  >
                    <span className="text-white font-medium">{player.name}</span>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="text-red-400 hover:text-red-300 font-semibold px-3 py-1 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 白队 */}
          {whitePlayers.length > 0 && (
            <div className="bg-white dark:bg-slate-100 rounded-2xl shadow-lg p-6 border-2 border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>⚪</span>
                <span>白队 ({whitePlayers.length}人)</span>
              </h2>
              <div className="space-y-2">
                {whitePlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between bg-slate-50 dark:bg-white rounded-xl p-3 border border-slate-200"
                  >
                    <span className="text-slate-800 font-medium">{player.name}</span>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="text-red-600 hover:text-red-700 font-semibold px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 空状态 */}
          {players.length === 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🏀</div>
              <p className="text-slate-600 dark:text-slate-300">
                还没有球员,请添加第一个球员
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 底部导航 */}
      {players.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/manage"
              className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg text-center active:scale-95 transition-all"
            >
              前往犯规记录 →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
