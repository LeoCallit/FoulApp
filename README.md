# 🏀 篮球犯规记录器

一个专为移动端设计的篮球比赛球员犯规记录管理系统。

## ✨ 功能特点

- 📱 **移动端优化**: 响应式设计,专为手机使用优化
- 👥 **球员管理**: 创建和管理黑队、白队球员
- 📊 **犯规记录**: 5节比赛的详细犯规统计
- 💾 **本地存储**: 数据自动保存到浏览器localStorage
- 🎨 **现代UI**: 使用Tailwind CSS打造的美观界面
- ⚡ **实时更新**: 使用React Context实现全局状态管理

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 即可使用。

### 构建生产版本
```bash
npm run build
npm start
```

## 📖 使用说明

### 1. 创建球员
- 在首页点击"创建球员"按钮
- 输入球员姓名
- 选择队伍类型(黑队/白队)
- 点击"添加球员"按钮

### 2. 管理犯规记录
- 在首页点击"犯规记录"按钮
- 选择当前比赛节次(第1-5节)
- 使用 +/- 按钮增减球员的犯规次数
- 底部显示双方队伍的总犯规数

### 3. 特殊提示
- 球员总犯规达到5次时会显示红色警告边框
- 单节犯规达到3次时数字会变红
- 所有数据自动保存,刷新页面不会丢失

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Context
- **数据存储**: localStorage
- **构建工具**: Turbopack

## 📁 项目结构

```
foulApp/
├── app/
│   ├── create/          # 球员创建页面
│   ├── manage/          # 犯规记录管理页面
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 首页
│   └── globals.css      # 全局样式
├── contexts/
│   └── GameContext.tsx  # 全局状态管理
├── types/
│   └── index.ts         # TypeScript类型定义
└── package.json
```

## 🎯 核心功能

### 数据模型

```typescript
// 球员接口
interface Player {
  id: string;           // 唯一标识
  name: string;         // 球员姓名
  team: "black" | "white";  // 队伍类型
  fouls: number[];      // 5节的犯规次数数组
}
```

### 状态管理

使用React Context提供以下方法:
- `addPlayer(name, team)` - 添加球员
- `removePlayer(id)` - 删除球员
- `addFoul(playerId, quarter)` - 增加犯规
- `removeFoul(playerId, quarter)` - 减少犯规
- `clearAllData()` - 清空所有数据

## 📱 移动端优化

- 禁用文本选择和点击高亮
- 视口设置防止缩放
- 大按钮设计便于触摸
- 响应式布局适配各种屏幕
- 活动按压反馈(`active:scale-95`)

## 🎨 设计原则

- **KISS**: 简洁直观的用户界面
- **移动优先**: 专为移动端设计
- **实时反馈**: 操作立即生效
- **数据安全**: 本地存储,不依赖服务器

## 📄 License

MIT
