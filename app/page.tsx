import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
            🏀 犯规记录器
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            篮球比赛球员犯规管理系统
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/create"
            className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-center active:scale-95"
          >
            <div className="text-lg">➕ 创建球员</div>
            <div className="text-sm opacity-90 mt-1">添加新的球员信息</div>
          </Link>

          <Link
            href="/manage"
            className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-center active:scale-95"
          >
            <div className="text-lg">📊 犯规记录</div>
            <div className="text-sm opacity-90 mt-1">管理球员犯规情况</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
