import { RecentAbilitiesRadarChart } from "@/components/RecentAbilitiesRadarChart";

interface SmallWayData {
  organization: string;
  count: number;
}

interface Props {
  direction: string | undefined;
  recommendData: SmallWayData | undefined;
}

export default function RecommendWay({ direction,recommendData }: Props) {
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

      <p className="mb-4 text-sm text-gray-600">
        选择该去向的学长就业能力平均值如下：
      </p>
      <RecentAbilitiesRadarChart />
      <p className="mb-4 text-sm text-gray-600">
        （待定）AI大模型提供的就业建议
        {/*prompt：我是来自北京理工大学本科生xx，学习成绩xx，获得xx奖学金，参与第二课堂xx次，不/是贫困生。我未来想走xx道路，请给一些建议*/}
        {/*将AI的输出放在这里*/}
      </p>
    </div>
  );
}
