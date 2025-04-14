'use client';

import { useEffect, useState } from "react";
import { getAiAdvice } from "@/app/(main)/prediction/action";

interface Props {
  direction: string | undefined;
}

export default function AiAdviceComponent({direction}: Props) {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    const advice = await getAiAdvice(direction);
    setAdvice(advice);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, [direction]); // 如果 direction 变化，也重新请求

  return (
    <div className="mb-4 text-sm text-gray-600">
      <p>由Deepseek生成的建议：</p>
      {loading ?  '根据您的个人情况和就业意向生成建议中，请耐心等待...' : (<p className="mt-2">{advice}</p>)}
    </div>
  );
}
