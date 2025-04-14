'use client';

import { useState } from 'react';

interface Props {
  direction: string | undefined;
}

export default function AiAdviceComponent({direction}: Props) {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    const res = await fetch('/api/generate-advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction }),
    });
    const data = await res.json();
    setAdvice(data.result);
    setLoading(false);
  };

  return (
    <div className="mb-4 text-sm text-gray-600">
      <p>由Deepseek生成的建议：</p>
      <button onClick={fetchAdvice} disabled={loading}>
        {loading ? '生成中...' : '生成建议'}
      </button>
      {advice && <p className="mt-2">{advice}</p>}
    </div>
  );
}
