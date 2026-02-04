
import React, { useState, useMemo, useRef } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Category, Job, JobSection } from '../types';
import { MOCK_JOBS } from '../constants';

type Tab = 'analytics' | 'master' | 'article' | 'event' | 'display';
type Period = 'weekly' | 'monthly' | 'yearly' | 'total';
type PreviewDevice = 'pc' | 'mobile';

interface AppEvent {
  id: string;
  title: string;
  date: string;
  location: string;
}

const Toolbar: React.FC<{ onAction: (tag: string) => void }> = ({ onAction }) => (
  <div className="flex space-x-1 mb-2 border-b border-gray-100 pb-2">
    <button onClick={() => onAction('b')} className="px-2 py-1 text-xs font-bold hover:bg-gray-100 rounded">B</button>
    <button onClick={() => onAction('i')} className="px-2 py-1 text-xs italic hover:bg-gray-100 rounded">I</button>
    <button onClick={() => onAction('h2')} className="px-2 py-1 text-xs font-bold hover:bg-gray-100 rounded">H2</button>
    <button onClick={() => onAction('p')} className="px-2 py-1 text-xs hover:bg-gray-100 rounded">P</button>
    <button onClick={() => onAction('br')} className="px-2 py-1 text-xs hover:bg-gray-100 rounded">改行</button>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('analytics');
  const [period, setPeriod] = useState<Period>('weekly');
  const [categories, setCategories] = useState<string[]>(Object.values(Category));
  const [articles, setArticles] = useState<Job[]>(MOCK_JOBS);
  const [events, setEvents] = useState<AppEvent[]>([
    { id: '1', title: '春の合同就職説明会', date: '2024-04-20', location: 'オンライン' },
    { id: '2', title: 'スタートアップ交流会', date: '2024-05-10', location: '東京都渋谷区' }
  ]);
  const [themeColor, setThemeColor] = useState('#f8f9fa');
  const [columns, setColumns] = useState(2);

  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('mobile');
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [newCatName, setNewCatName] = useState('');
  const [showSaveFeedback, setShowSaveFeedback] = useState(false);

  const analyticsData = useMemo(() => {
    const dataMap: Record<Period, any[]> = {
      weekly: [{ name: '月', uv: 2400 }, { name: '火', uv: 1398 }, { name: '水', uv: 9800 }, { name: '木', uv: 3908 }, { name: '金', uv: 4800 }, { name: '土', uv: 3800 }, { name: '日', uv: 4300 }],
      monthly: [{ name: '1週', uv: 12000 }, { name: '2週', uv: 15000 }, { name: '3週', uv: 11000 }, { name: '4週', uv: 18000 }],
      yearly: [{ name: '1月', uv: 40000 }, { name: '2月', uv: 35000 }, { name: '3月', uv: 50000 }, { name: '4月', uv: 45000 }, { name: '5月', uv: 60000 }, { name: '6月', uv: 55000 }],
      total: [{ name: '2021', uv: 200000 }, { name: '2022', uv: 350000 }, { name: '2023', uv: 500000 }, { name: '2024', uv: 124592 }]
    };
    return dataMap[period];
  }, [period]);

  const openEditModal = (job: Job | null) => {
    if (job) {
      setEditingJob({ ...job });
    } else {
      setEditingJob({
        id: Math.random().toString(36).substr(2, 9),
        title: '',
        titleMessage: '',
        company: '',
        categories: [],
        sections: Array(10).fill(null).map(() => ({ mediaType: 'none', mediaData: '', articleContent: '' })),
        requirements: '',
        salary: '',
        location: '',
        postedAt: new Date().toISOString().split('T')[0],
        status: '募集中'
      });
    }
    setIsArticleModalOpen(true);
    setIsPreviewMode(false);
  };

  const handleFileUpload = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingJob) {
      const type = file.type.startsWith('video') ? 'video' : 'image';
      const url = URL.createObjectURL(file);
      const newSections = [...editingJob.sections];
      newSections[idx] = { ...newSections[idx], mediaType: type, mediaData: url };
      setEditingJob({ ...editingJob, sections: newSections });
    }
  };

  const handleCategoryToggle = (cat: string) => {
    if (!editingJob) return;
    const category = cat as Category;
    const newCategories = editingJob.categories.includes(category)
      ? editingJob.categories.filter(c => c !== category)
      : [...editingJob.categories, category];
    setEditingJob({ ...editingJob, categories: newCategories });
  };

  const handleSaveJob = (closeModal: boolean = true) => {
    if (!editingJob) return;
    const firstMedia = editingJob.sections[0].mediaData;
    const finalJob = { ...editingJob, thumbnailUrl: firstMedia };
    
    const existingIndex = articles.findIndex(a => a.id === finalJob.id);
    if (existingIndex > -1) {
      const newArticles = [...articles];
      newArticles[existingIndex] = finalJob;
      setArticles(newArticles);
    } else {
      setArticles([finalJob, ...articles]);
    }

    if (closeModal) {
      setIsArticleModalOpen(false);
      setEditingJob(null);
    } else {
      setShowSaveFeedback(true);
      setTimeout(() => setShowSaveFeedback(false), 2000);
    }
  };

  const injectTag = (field: string, tag: string, sectionIndex?: number) => {
    if (!editingJob) return;
    const open = `<${tag}>`;
    const close = `</${tag}>`;
    let currentText = '';

    if (field === 'titleMessage') currentText = editingJob.titleMessage;
    else if (field === 'requirements') currentText = editingJob.requirements;
    else if (field === 'articleContent' && sectionIndex !== undefined) currentText = editingJob.sections[sectionIndex].articleContent;

    const newText = currentText + open + close;

    if (field === 'titleMessage') setEditingJob({ ...editingJob, titleMessage: newText });
    else if (field === 'requirements') setEditingJob({ ...editingJob, requirements: newText });
    else if (field === 'articleContent' && sectionIndex !== undefined) {
      const newSections = [...editingJob.sections];
      newSections[sectionIndex].articleContent = newText;
      setEditingJob({ ...editingJob, sections: newSections });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
              {['weekly', 'monthly', 'yearly', 'total'].map(p => (
                <button key={p} onClick={() => setPeriod(p as Period)} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  {p === 'weekly' ? '週間' : p === 'monthly' ? '月間' : p === 'yearly' ? '年間' : '累計'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ label: '総PV数', value: '124,592' }, { label: '応募総数', value: '1,420' }, { label: '掲載中求人', value: articles.length }].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[400px]">
              <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center">アクセス解析</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="uv" stroke="#111827" strokeWidth={3} dot={{ r: 4, fill: '#111827', stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'master':
        return (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">カテゴリ設定</h3>
              <div className="flex space-x-2">
                <input type="text" placeholder="新規カテゴリ名" className="px-3 py-2 text-sm bg-gray-50 rounded-lg" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} />
                <button onClick={() => { if(newCatName) { setCategories([...categories, newCatName]); setNewCatName(''); } }} className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg">追加</button>
              </div>
            </div>
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-50">
                {categories.map((cat, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{cat}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setCategories(categories.filter((_, idx) => idx !== i))} className="text-red-300 hover:text-red-500">削除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'article':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-900">求人管理</h3>
              <button onClick={() => openEditModal(null)} className="px-6 py-3 bg-gray-900 text-white text-xs font-bold rounded-xl shadow-lg">＋ 求人を作成</button>
            </div>
            <div className="grid gap-4">
              {articles.map(job => (
                <div key={job.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      {job.sections[0]?.mediaType === 'video' ? (
                        <video src={job.sections[0].mediaData} className="w-full h-full object-cover" />
                      ) : (
                        <img src={job.sections[0]?.mediaData} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{job.title}</h4>
                      <p className="text-xs text-gray-400">
                        {job.categories.join(' · ')} · {job.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => openEditModal(job)} className="px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">編集</button>
                    <button onClick={() => setArticles(articles.filter(a => a.id !== job.id))} className="px-3 py-1.5 text-xs bg-red-50 text-red-500 rounded-lg hover:bg-red-100">削除</button>
                  </div>
                </div>
              ))}
            </div>

            {isArticleModalOpen && editingJob && (
              <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-6xl h-[95vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative">
                  
                  {/* 一時保存完了フィードバック */}
                  {showSaveFeedback && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-[120] animate-bounce">
                      <div className="bg-green-500 text-white px-6 py-2 rounded-full shadow-2xl text-xs font-bold">
                        一時保存しました
                      </div>
                    </div>
                  )}

                  <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">求人の詳細編集</h3>
                    <div className="flex space-x-3 pr-12">
                      <button 
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center space-x-2 border shadow-sm ${isPreviewMode ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'}`}
                      >
                        <span>{isPreviewMode ? '編集画面に戻る' : 'プレビュー'}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button onClick={() => setIsArticleModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto bg-white">
                    {isPreviewMode ? (
                      <div className="flex flex-col h-full bg-gray-100">
                        {/* デバイス切り替えスイッチ */}
                        <div className="flex justify-center p-4 bg-white border-b border-gray-100 space-x-4">
                          <button onClick={() => setPreviewDevice('mobile')} className={`flex items-center space-x-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${previewDevice === 'mobile' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                             <span>Mobile</span>
                          </button>
                          <button onClick={() => setPreviewDevice('pc')} className={`flex items-center space-x-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${previewDevice === 'pc' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                             <span>Desktop</span>
                          </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-8">
                          {previewDevice === 'mobile' ? (
                            <div className="max-w-[375px] mx-auto border-[12px] border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl bg-white relative aspect-[9/19]">
                              <div className="absolute top-0 w-full h-8 bg-black z-10 flex items-center justify-center">
                                <div className="w-20 h-4 bg-gray-800 rounded-full"></div>
                              </div>
                              <div className="h-full overflow-y-auto pt-10 pb-20">
                                <div className="p-6 space-y-12">
                                  <div className="flex flex-wrap justify-center gap-1">
                                    {editingJob.categories.map(c => <span key={c} className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[8px] font-bold rounded-full">{c}</span>)}
                                  </div>
                                  <div className="prose prose-sm text-center" dangerouslySetInnerHTML={{ __html: editingJob.titleMessage }} />
                                  {editingJob.sections.filter(s => s.mediaType !== 'none').map((s, i) => (
                                    <div key={i} className="space-y-6">
                                      <div className="aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-lg">
                                        {s.mediaType === 'video' ? <video src={s.mediaData} muted autoPlay loop className="w-full h-full object-cover" /> : <img src={s.mediaData} className="w-full h-full object-cover" />}
                                      </div>
                                      <div className="prose prose-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.articleContent }} />
                                    </div>
                                  ))}
                                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Requirements</h4>
                                    <div className="prose prose-xs text-gray-600" dangerouslySetInnerHTML={{ __html: editingJob.requirements }} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden min-h-full">
                               <div className="p-12 space-y-20">
                                  <section className="text-center">
                                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                                      {editingJob.categories.map(c => <span key={c} className="px-3 py-1 bg-gray-100 text-gray-400 text-[10px] font-bold rounded-full uppercase tracking-widest">{c}</span>)}
                                    </div>
                                    <div className="prose prose-lg max-w-none text-gray-900" dangerouslySetInnerHTML={{ __html: editingJob.titleMessage }} />
                                    <p className="mt-4 text-gray-400 font-medium">{editingJob.company}</p>
                                  </section>
                                  
                                  {editingJob.sections.filter(s => s.mediaType !== 'none').map((s, i) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                      <div className={`aspect-[9/16] bg-black rounded-[2.5rem] overflow-hidden shadow-2xl ${i % 2 === 1 ? 'md:order-last' : ''}`}>
                                        {s.mediaType === 'video' ? <video src={s.mediaData} muted autoPlay loop className="w-full h-full object-cover" /> : <img src={s.mediaData} className="w-full h-full object-cover" />}
                                      </div>
                                      <div className="prose prose-gray max-w-none leading-loose text-gray-600" dangerouslySetInnerHTML={{ __html: s.articleContent }} />
                                    </div>
                                  ))}
                                  
                                  <section className="pt-20 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-12 text-center italic">Requirements</h3>
                                    <div className="bg-gray-50 rounded-3xl p-12">
                                      <div className="prose prose-gray max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: editingJob.requirements }} />
                                      <div className="grid grid-cols-2 gap-12 mt-12 pt-12 border-t border-gray-200">
                                        <div>
                                          <dt className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">給与</dt>
                                          <dd className="text-gray-900 font-medium">{editingJob.salary}</dd>
                                        </div>
                                        <div>
                                          <dt className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">勤務地</dt>
                                          <dd className="text-gray-900 font-medium">{editingJob.location}</dd>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                               </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">管理用名称</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 rounded-xl" value={editingJob.title} onChange={e => setEditingJob({...editingJob, title: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">カテゴリ (複数選択可能)</label>
                            <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 rounded-xl max-h-48 overflow-y-auto border border-gray-100">
                              {categories.map(cat => (
                                <label key={cat} className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer hover:text-gray-900">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900" 
                                    checked={editingJob.categories.includes(cat as Category)}
                                    onChange={() => handleCategoryToggle(cat)}
                                  />
                                  <span>{cat}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">ステータス</label>
                              <select className="w-full px-4 py-3 bg-gray-50 rounded-xl" value={editingJob.status} onChange={e => setEditingJob({...editingJob, status: e.target.value as any})}>
                                <option value="募集中">募集中</option>
                                <option value="選考中">選考中</option>
                                <option value="募集終了">募集終了</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">勤務地（簡易表示用）</label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 rounded-xl" value={editingJob.location} onChange={e => setEditingJob({...editingJob, location: e.target.value})} />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">給与（簡易表示用）</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 rounded-xl" value={editingJob.salary} onChange={e => setEditingJob({...editingJob, salary: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">1. 惹きつけるメッセージ (HTML可)</label>
                            <Toolbar onAction={(tag) => injectTag('titleMessage', tag)} />
                            <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 rounded-xl font-mono text-xs" value={editingJob.titleMessage} onChange={e => setEditingJob({...editingJob, titleMessage: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">22. 募集要項 (HTML可)</label>
                            <Toolbar onAction={(tag) => injectTag('requirements', tag)} />
                            <textarea rows={5} className="w-full px-4 py-3 bg-gray-50 rounded-xl font-mono text-xs" value={editingJob.requirements} onChange={e => setEditingJob({...editingJob, requirements: e.target.value})} />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-l-4 border-gray-900 pl-3">動画/画像セクション (最大10個)</h4>
                          <div className="space-y-8">
                            {editingJob.sections.map((section, idx) => (
                              <div key={idx} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 relative group">
                                <span className="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 text-white flex items-center justify-center rounded-full text-xs font-bold">
                                  {idx + 1}
                                </span>
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">縦型メディア (動画/画像)</label>
                                    <div className="flex items-center space-x-4">
                                      <input 
                                        type="file" 
                                        accept="video/*,image/*"
                                        className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300" 
                                        onChange={(e) => handleFileUpload(idx, e)}
                                      />
                                      {section.mediaData && (
                                        <div className="w-16 h-28 bg-black rounded-lg overflow-hidden shadow-inner">
                                          {section.mediaType === 'video' ? <video src={section.mediaData} muted className="w-full h-full object-cover" /> : <img src={section.mediaData} className="w-full h-full object-cover" />}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">セクション記事</label>
                                    <Toolbar onAction={(tag) => injectTag('articleContent', tag, idx)} />
                                    <textarea 
                                      rows={3} 
                                      className="w-full px-4 py-3 bg-white rounded-xl font-mono text-xs" 
                                      placeholder={`セクション ${idx + 1} の記事`}
                                      value={section.articleContent} 
                                      onChange={e => {
                                        const newS = [...editingJob.sections];
                                        newS[idx].articleContent = e.target.value;
                                        setEditingJob({...editingJob, sections: newS});
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-8 border-t border-gray-100 flex justify-end items-center space-x-4 bg-gray-50/50">
                    <button onClick={() => setIsArticleModalOpen(false)} className="px-6 py-3 bg-white text-gray-400 font-bold rounded-xl border border-gray-200 hover:text-gray-600">破棄</button>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleSaveJob(false)} 
                        className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl border border-gray-900 hover:bg-gray-50 transition-all"
                      >
                        一時保存
                      </button>
                      <button 
                        onClick={() => handleSaveJob(true)} 
                        className="px-12 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-xl"
                      >
                        保存して公開する
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'display':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-6">サイトテーマ</h3>
              <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-6">表示カラム数</h3>
              <div className="flex space-x-4">
                {[1, 2, 3].map(num => (
                  <button key={num} onClick={() => setColumns(num)} className={`flex-1 py-3 rounded-xl border ${columns === num ? 'bg-gray-900 text-white' : 'bg-white'}`}>{num}列</button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 space-y-1">
        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 text-center">Admin Menu</p>
        {[
          { id: 'analytics', label: 'ダッシュボード', icon: '📊' },
          { id: 'master', label: 'マスタ管理', icon: '⚙️' },
          { id: 'article', label: '求人管理', icon: '📝' },
          { id: 'display', label: '表示管理', icon: '🎨' }
        ].map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id as Tab)} className={`w-full text-left px-4 py-4 rounded-2xl text-sm font-bold flex items-center space-x-3 transition-all ${activeTab === item.id ? 'bg-gray-900 text-white shadow-xl' : 'text-gray-500 hover:bg-white'}`}>
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </aside>
      <div className="flex-1">
        <header className="mb-8">
          <h2 className="text-3xl font-light text-gray-900 italic tracking-tight">{activeTab === 'article' ? 'JOB MANAGEMENT' : activeTab.toUpperCase()}</h2>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
