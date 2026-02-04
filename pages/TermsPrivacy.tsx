
import React from 'react';

const TermsPrivacy: React.FC<{ type: 'terms' | 'privacy' }> = ({ type }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light text-gray-900 mb-12 italic underline decoration-gray-100">
        {type === 'terms' ? 'Terms of Service.' : 'Privacy Policy.'}
      </h1>
      <div className="prose prose-gray prose-sm max-w-none text-gray-500 leading-loose space-y-8">
        <section>
          <h2 className="text-gray-900 font-bold text-lg mb-4">第1条（はじめに）</h2>
          <p>
            本規約は、hito-koto（以下「本サービス」）が提供するすべてのサービスにおける利用条件を定めるものです。
            ユーザーの皆様には、本規約に従って本サービスをご利用いただきます。
          </p>
        </section>
        <section>
          <h2 className="text-gray-900 font-bold text-lg mb-4">第2条（個人情報の取扱い）</h2>
          <p>
            本サービスは、ユーザーの個人情報を適切に管理し、本人の同意なく第三者に提供することはありません。
            応募時に入力された情報は、当該求人企業への送信および完了通知の送付にのみ使用されます。
          </p>
        </section>
        <section>
          <h2 className="text-gray-900 font-bold text-lg mb-4">第3条（禁止事項）</h2>
          <ul className="list-disc list-inside">
            <li>虚偽の情報を用いて応募する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>公序良俗に反する行為</li>
          </ul>
        </section>
        <section>
          <h2 className="text-gray-900 font-bold text-lg mb-4">第4条（免責事項）</h2>
          <p>
            本サービスに掲載される求人情報は、各企業の責任において提供されるものです。
            情報の正確性や、応募後の企業とのトラブルについて、当サービスは一切の責任を負いかねます。
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPrivacy;
