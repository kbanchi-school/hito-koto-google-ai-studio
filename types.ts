
export enum Category {
  RECRUITING = '募集中',
  TOHOKU = '東北求人',
  KANTO = '関東求人',
  WEST_JAPAN = '西日本求人',
  HOKKAIDO = '北海道求人',
  OVERSEAS = '海外求人',
  REMOTE = 'リモートワーク',
  STARTUP = 'スタートアップ',
  BUSINESS_SUCCESSION = '事業承継'
}

export interface JobSection {
  mediaType: 'video' | 'image' | 'none';
  mediaData: string; // Base64 or Object URL
  articleContent: string;
}

export interface Job {
  id: string;
  title: string; // 管理用タイトル
  titleMessage: string; // 惹きつけるメッセージ
  company: string;
  categories: Category[]; // 複数カテゴリ対応
  thumbnailUrl?: string; // セクション1から自動取得されるが保持も可能
  sections: JobSection[]; // 最大10セット
  requirements: string; // 募集要項
  salary: string;
  location: string;
  postedAt: string;
  status: '募集中' | '選考中' | '募集終了';
}

export interface ApplicationForm {
  name: string;
  email: string;
  emailConfirm: string;
  message: string;
  attachment?: File;
}

export interface ContactForm {
  name: string;
  email: string;
  emailConfirm: string;
  message: string;
  attachment?: File;
}
