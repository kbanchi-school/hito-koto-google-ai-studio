
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_JOBS } from '../constants';

const ApplyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = MOCK_JOBS.find(j => j.id === id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConfirm: '',
    message: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email !== formData.emailConfirm) {
      setError('メールアドレスが一致しません。');
      return;
    }
    setError('');
    // Simulate sending email notification logic
    console.log('Sending completion email to:', formData.email);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">応募が完了しました</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {formData.email} 宛に応募完了メールを送信しました。<br />
          今後は企業担当者より直接ご連絡がございますので、しばらくお待ちください。
        </p>
        <Link 
          to="/" 
          className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
        >
          ホームへ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link to={`/job/${id}`} className="inline-flex items-center text-sm text-gray-400 hover:text-gray-900 mb-8 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        求人詳細に戻る
      </Link>

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">応募フォーム</h1>
        <p className="text-sm text-gray-500">
          応募先: <span className="font-semibold text-gray-800">{job?.company}</span> - {job?.title}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">氏名</label>
          <input 
            type="text" 
            required
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 transition-all"
            placeholder="山田 太郎"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">メールアドレス</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 transition-all"
              placeholder="example@hito-koto.jp"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">確認用メールアドレス</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 transition-all"
              placeholder="example@hito-koto.jp"
              value={formData.emailConfirm}
              onChange={e => setFormData({...formData, emailConfirm: e.target.value})}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">自由記述欄</label>
          <textarea 
            rows={5}
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 transition-all"
            placeholder="志望動機や自己PRなどをご記入ください"
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">履歴書・ポートフォリオ（任意）</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-100 border-dashed rounded-xl hover:border-gray-300 transition-colors">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-gray-900 hover:text-gray-700">
                  <span>ファイルをアップロード</span>
                  <input type="file" className="sr-only" />
                </label>
                <p className="pl-1 text-gray-400">またはドラッグ＆ドロップ</p>
              </div>
              <p className="text-xs text-gray-400">PDF, JPG, PNG 最大 10MB</p>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
        >
          送信する
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
