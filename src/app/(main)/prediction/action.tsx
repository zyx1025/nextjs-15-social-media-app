"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface BigWayData {
  way: string;
  count: number;
  fill: string;
}

interface SmallWayData {
  organization: string;
  count: number;
}

export async function predictBigWay(
  studentId: string,
  selectedDirection: string | null | undefined = "升学"
): Promise<[BigWayData[], SmallWayData[]]> {

  const results = {
    employment: 0,
    studyAbroad: 0,
    furtherEducation: 0,
    selection: 0,
  };

  // 初始化小方向结果
  const smallWayResults: Record<string, number> = {};

  // 查询 A 的固定数据
  const [gradeDataA, conditionDataA] = await Promise.all([
    prisma.grade.findUnique({ where: { student_id: studentId } }),
    prisma.condition.findUnique({ where: { student_id: studentId } }),
  ]);

  if (!gradeDataA || !conditionDataA) {
    throw new Error("Student A data not found.");
  }

  // 解析 A 的地址
  const addressA = parseAddress(conditionDataA.address);

  // 查询 B 的所有数据
  const allBJobs = await prisma.job.findMany();
  const allGrades = await prisma.grade.findMany();
  const allConditions = await prisma.condition.findMany();
  const hardStudents = new Set(
    (await prisma.hard.findMany()).map((hard) => hard.student_id)
  );

  for (const job of allBJobs) {
    const B_studentId = job.student_id;

    // 获取 B 的数据
    const gradeDataB = allGrades.find((grade) => grade.student_id === B_studentId);
    const conditionDataB = allConditions.find(
      (condition) => condition.student_id === B_studentId
    );

    if (!gradeDataB || !conditionDataB) {
      continue;
    }

    // 检查 GPA 差距
    const gpaDifference = Math.abs(gradeDataA.average_gpa - gradeDataB.average_gpa);
    if (gpaDifference > 5) {
      continue;
    }

    // 计算初始相似度
    let similarity = 5 - gpaDifference;

    // 检查专业是否相同
    if (conditionDataA.major === conditionDataB.major) {
      similarity += 2;
    }

    // 检查政治面貌是否相同
    if (conditionDataA.political_status === conditionDataB.political_status) {
      similarity += 2;
    }

    // 检查地址相似性
    const addressB = parseAddress(conditionDataB.address);
    if (addressA.province === addressB.province) {
      similarity += 2;
    } else if (addressA.region === addressB.region) {
      similarity += 5;
    }

    // 检查经济困难情况
    if (hardStudents.has(B_studentId)) {
      similarity += 4;
    }

    // 如果相似度大于等于 5，更新对应分类的计数
    if (similarity >= 5) {

      if (job.graduation_destination.includes("就业")) {
        results.employment++;

        if(selectedDirection=="就业"){
          let organization = job.organization_name || "其它";
          if(organization.includes("北京理工大学")){
            organization = "北京理工大学";
          }

          if (smallWayResults[organization]) {
            smallWayResults[organization]++;
          } else {
            smallWayResults[organization] = 1;
          }
        }
      } else if (
        job.graduation_destination === "出国、出境" ||
        job.graduation_destination === "境外留学" ||
        job.graduation_destination === "拟出国出境"
      ) {
        results.studyAbroad++;

        if(selectedDirection=="留学"){
          const organization = job.organization_name || "其它";
          if (smallWayResults[organization]) {
            smallWayResults[organization]++;
          } else {
            smallWayResults[organization] = 1;
          }
        }
      } else if (
        job.graduation_destination === "研究生" ||
        job.graduation_destination === "第二学士学位" ||
        job.graduation_destination === "科研助理、管理助理" ||
        job.graduation_destination === "不就业拟升学"
      ) {
        results.furtherEducation++;
        if(selectedDirection=="升学"){
          let organization = job.organization_name || "其它";
          if(organization.includes("北京理工大学")){
            organization = "北京理工大学";
          }

          if (smallWayResults[organization]) {
            smallWayResults[organization]++;
          } else {
            smallWayResults[organization] = 1;
          }
        }
      } else {
        results.selection++;

        if(selectedDirection=="选调"){
          const organization = job.organization_name || "其它";
          if (smallWayResults[organization]) {
            smallWayResults[organization]++;
          } else {
            smallWayResults[organization] = 1;
          }
        }
      }
    }
  }

  // 生成大方向数据
  const bigWayData: BigWayData[] = [
    { way: "就业", count: results.employment, fill: "var(--color-firefox)" },
    { way: "留学", count: results.studyAbroad, fill: "var(--color-safari)" },
    { way: "升学", count: results.furtherEducation, fill: "var(--color-chrome)" },
    { way: "选调", count: results.selection, fill: "var(--color-edge)" },
  ];


  // 生成小方向数据
  const smallWayData: SmallWayData[] = Object.entries(smallWayResults)
    .map(([organization, count]) => ({
      organization,
      count,
    }))
    //count大的放前面
    .sort((a, b) => {
      // 如果其中一个是 "其它"，将它排到最后
      if (a.organization === "其它") return 1;
      if (b.organization === "其它") return -1;

      // 否则按照 count 从大到小排序
      return b.count - a.count;
    });

  return [bigWayData, smallWayData];
}

// 辅助函数：解析地址
function parseAddress(address: string): { province: string; region: string } {
  if (!address) {
    return { province: "", region: "" };
  }

  let province = address.substring(0, 2);
  if (province === "黑龙") {
    province = address.substring(0, 3); // 特例处理黑龙江
  }

  const region = address.replace(/^.{2,3}/, ""); // 截取省名后的部分
  return { province, region };
}


//deepseek生成建议：
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY!,
});

export async function getAiAdvice(
  selectedDirection: string = "升学"
): Promise<string> {
  const prompt = `请为选择${selectedDirection}方向的学生提供一段式就业建议，要求：
1. 不提及升学率数据
2. 避免分点罗列
3. 只包含学生如何达成这一目标。不涉及以后的职业规划。如学生的方向是升学，不要给他升学之后的建议。
4. 禁用交互性语句
5. 减少空话，多提供具体性的建议。例如若学生倾向是升学，推荐他去https://cs.bit.edu.cn/下查阅老师的研究方向，并联系自己喜欢方向的导师。若学生倾向是就业，则推荐他去job.bit.edu.cn查询自己心仪企业的招聘要求等。
请用连贯段落输出专业建议。`;

  try {
    console.log("start exe")
    const res = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "你要向一位北京理工大学的学生提供就业指导建议，请遵守以下规范。" },
        { role: "user", content: prompt },
      ],
      model: "deepseek-chat",
    });
    return res.choices[0].message.content || "未生成建议。";

  } catch (error) {
    console.error("DeepSeek error:", error);
    return "生成建议时出错，请稍后重试。";
  }
}