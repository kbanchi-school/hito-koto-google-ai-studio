
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_JOBS } from '../constants';
import { Job } from '../types';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const found = MOCK_JOBS.find(j => j.id === id);
    if (found) setJob(found);
  }, [id]);

  if (!job) return <div className="p-20 text-center text-gray-400">読み込み中...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 bg-white">
      <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-gray-900 mb-12 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        一覧に戻る
      </Link>

      <div className="space-y-16">
        {/* 1. タイトルメッセージ */}
        <section className="text-center py-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {job.categories.map(cat => (
              <span key={cat} className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-widest">
                {cat}
              </span>
            ))}
          </div>
          <div 
            className="prose prose-lg max-w-none text-gray-900"
            dangerouslySetInnerHTML={{ __html: job.titleMessage }} 
          />
          <p className="mt-4 text-gray-400 font-medium">{job.company}</p>
        </section>

        {/* 2-21. 動画/画像と記事のペア */}
        {job.sections.filter(s => s.mediaType !== 'none').map((section, index) => (
          <div key={index} className="space-y-12">
            <div className="relative aspect-[9/16] max-w-[400px] mx-auto bg-black rounded-[2.5rem] overflow-hidden shadow-2xl">
              {section.mediaType === 'video' ? (
                <video 
                  src={section.mediaData} 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
              ) : (
                <img 
                  src={section.mediaData} 
                  className="w-full h-full object-cover" 
                  alt={`Section ${index + 1}`} 
                />
              )}
            </div>
            <div className="prose prose-gray max-w-none leading-loose text-gray-600">
              <div dangerouslySetInnerHTML={{ __html: section.articleContent }} />
            </div>
          </div>
        ))}

        {/* 22. 募集要項 */}
        <section className="pt-16 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 text-center italic">Requirements</h3>
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <div 
              className="prose prose-gray max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: job.requirements }} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-200/50">
              <div>
                <dt className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">給与</dt>
                <dd className="text-gray-900 font-medium">{job.salary}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">勤務地</dt>
                <dd className="text-gray-900 font-medium">{job.location}</dd>
              </div>
            </div>
          </div>
        </section>

        {/* 23. 募集ステータス & 応募ボタン */}
        <section className="py-12 text-center space-y-8">
          <div className="inline-flex items-center px-6 py-2 bg-gray-100 rounded-full">
            <span className={`w-2 h-2 rounded-full mr-3 ${job.status === '募集中' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            <span className="text-sm font-bold text-gray-600 tracking-widest">STATUS: {job.status}</span>
          </div>

          {job.status === '募集中' && (
            <Link 
              to={`/apply/${job.id}`}
              className="block w-full max-w-sm mx-auto py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              この求人に応募する
            </Link>
          )}
        </section>
      </div>
    </div>
  );
};

export default JobDetail;
