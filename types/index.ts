// 队伍类型
export type TeamType = "black" | "white";

// 球员接口
export interface Player {
  id: string;
  name: string;
  team: TeamType;
  fouls: number[]; // 每节的犯规次数,索引0-4代表5节
}

// 数据存储接口
export interface GameData {
  players: Player[];
}
