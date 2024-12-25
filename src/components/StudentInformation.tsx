import { Card } from "@/components/ui/card";

interface StudentInformationProps {
  id: string;
}

//id即学号
export default function StudentInformation({ id }: StudentInformationProps) {
  return (
    <div>
      学号：{id}
      <br />
      姓名：xxx
      <br />
      政治面貌：xxx
    </div>
  );
}