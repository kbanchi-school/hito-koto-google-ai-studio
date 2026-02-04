
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostJobInfo: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
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
    console.log('Sending inquiry email to:', formData.email);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">お問い合わせを承りました</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {formData.email} 宛に確認メールを送信しました。<br />
          担当者より3営業日以内にご連絡させていただきます。
        </p>
        <Link to="/" className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800">
          ホームへ戻る
        </Link>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button onClick={() => setShowForm(false)} className="text-sm text-gray-400 hover:text-gray-900 mb-8">
          ← 説明ページに戻る
        </button>
        <h1 className="text-3xl font-light text-gray-900 mb-8 italic">Inquiry Form.</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">担当者名</label>
            <input type="text" required className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">メールアドレス</label>
              <input type="email" required className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">確認用</label>
              <input type="email" required className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl" value={formData.emailConfirm} onChange={e => setFormData({...formData, emailConfirm: e.target.value})} />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">お問い合わせ内容・会社概要</label>
            <textarea rows={5} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
          </div>
          <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800">
            送信する
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extralight text-gray-900 mb-6 tracking-tight italic">Work with us.</h1>
        <p className="text-lg text-gray-500 font-light">
          hito-kotoは、企業の想いを動画とストーリーで届ける求人メディアです。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { title: "動画で届ける", desc: "職場の空気感や働く人の表情を、縦動画でダイレクトに伝えます。" },
          { title: "ストーリー重視", desc: "単なる条件ではなく、なぜその仕事が必要なのか、その背景を言語化します。" },
          { title: "ダイレクト連絡", desc: "応募後のやり取りは直接メールで行うため、スムーズな選考が可能です。" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-4">{item.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 text-white rounded-3xl p-12 text-center">
        <h2 className="text-2xl font-light mb-8">掲載までの流れ</h2>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-2xl mx-auto space-y-8 md:space-y-0 md:space-x-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
            <p className="text-sm">お問い合わせ</p>
          </div>
          <div className="hidden md:block w-8 h-px bg-white/20"></div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
            <p className="text-sm">ヒアリング・撮影</p>
          </div>
          <div className="hidden md:block w-8 h-px bg-white/20"></div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
            <p className="text-sm">記事公開</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="mt-16 px-12 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl"
        >
          お問い合わせはこちら
        </button>
      </div>
    </div>
  );
};

export default PostJobInfo;
