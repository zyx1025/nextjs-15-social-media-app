import { RecentAbilitiesRadarChart } from "@/components/RecentAbilitiesRadarChart";
import AiAdviceComponent from "@/components/AiSuggestionText";
import { useState } from "react";

interface SmallWayData {
  organization: string;
  count: number;
}

interface RecommendWayProps {
  direction?: string;
  recommendData?: SmallWayData;
}

export default function RecommendWay({ direction,recommendData }: RecommendWayProps) {
  return (
    <div className=" flex-shrink-0 rounded-lg bg-white p-6 shadow-md">

      <h3 className="mb-4 text-lg font-bold text-gray-700">
        {direction ? (
          <>
            鉴于您的倾向是 <span className="text-blue-600">{direction}</span>，推荐您的去向是
            <span className="text-blue-600"> {recommendData?.organization || "北京理工大学"}</span>
          </>
        ) : (
          <>
            推荐您的就业去向是：
            <span className="text-blue-600"> 升学 —— 北京理工大学</span>
          </>
        )}
      </h3>


      <RecentAbilitiesRadarChart direction={direction} />
      
      <AiAdviceComponent direction={direction} />



    </div>
  );
}
