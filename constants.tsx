
import { Category, Job } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: '伝統工芸Webデザイナー',
    titleMessage: '<h2 class="text-3xl font-bold">100年続く技術を、<span class="text-gray-400 italic">あなたのデザインで</span>世界へ。</h2>',
    company: '株式会社クラフト・エッジ',
    categories: [Category.TOHOKU, Category.REMOTE],
    sections: [
      {
        mediaType: 'video',
        mediaData: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-2364-large.mp4',
        articleContent: '<p>私たちの工房では、毎朝職人たちが静かに作業を始めます。その空気感、音、そして完成した瞬間の輝きを、デジタルの力でどう表現できるか。私たちは常に挑戦しています。</p>'
      },
      {
        mediaType: 'image',
        mediaData: 'https://picsum.photos/seed/craft1/800/1200',
        articleContent: '<p>チームは少数精鋭。デザイナーであっても、実際に工房に足を運び、素材に触れることからプロジェクトが始まります。</p>'
      }
    ],
    requirements: '<p>・実務経験3年以上<br>・デザインへの飽くなき情熱</p>',
    salary: '月給 25万円〜40万円',
    location: '宮城県仙台市',
    postedAt: '2024-05-15',
    status: '募集中'
  },
  {
    id: '2',
    title: 'AIエンジニア',
    titleMessage: '<h2 class="text-3xl font-bold">AIと人間の<span class="border-b-4 border-gray-200">新しい共生</span>を。</h2>',
    company: 'NextGen Solutions',
    categories: [Category.STARTUP, Category.KANTO],
    sections: [
      {
        mediaType: 'video',
        mediaData: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-in-a-dark-office-4848-large.mp4',
        articleContent: '<p>最新のLLMを駆使し、これまでにない体験をユーザーに提供します。</p>'
      }
    ],
    requirements: '<p>・Python, PyTorchの経験</p>',
    salary: '年俸 600万円〜1000万円',
    location: '東京都渋谷区',
    postedAt: '2024-05-18',
    status: '募集中'
  }
];
