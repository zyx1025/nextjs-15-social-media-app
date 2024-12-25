"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ChartData {
  dimension: string;
  value: number;
}

//维度1：学习成绩（选取的成绩为几门专业课的），/10为得分，得分范围内在0-10之间
async function evaluateScore(studentId: string) {
  const grade = await prisma.grade.findUnique({
    where: {
      student_id: studentId,
    },
  });

  const eValue = grade ? grade.average_gpa / 10 : 8.12;
  return eValue;
}

//维度2：第二课堂参与情况，参与门数在0-16之间，得分为6+ 参与门数/4,得分范围在6-10之间
async function evaluateSecondCourse(studentId: string) {
  const courseLog = await prisma.secondCourse.findUnique({
    where: {
      student_id: studentId,
    },
  });

  const coursesCount = courseLog?.courses_count || 0; // 如果未查到数据，说明此人参与第二课堂0节
  const eValue = 6 + coursesCount / 4;

  return eValue;
}

//维度3：获奖情况，现在仅统计奖学金。获取奖学金数量在0-12之间，得分为4+ 获取奖学金次数/2,得分范围在4-10之间
async function evaluateAward(studentId: string) {
  const awardLog = await prisma.award.findUnique({
    where: {
      student_id: studentId,
    },
  });

  const awardCount = awardLog?.scholarships_count || 0; // 如果未查到数据，说明此人参与第二课堂0节
  const eValue = 4 + awardCount / 2;

  return eValue;
}

//维度4：家庭情况，现在仅看是否申请了困难认证，无/B/C/D分别对应8/6/4/2
// (暂未补充)若家在北京、天津、上海、重庆的再+1
async function evaluateCondition(studentId: string) {
  const conditionLog = await prisma.hard.findUnique({
    where: {
      student_id: studentId,
    },
  });
  if (!conditionLog) {
    return 8;
  }

  switch (conditionLog.hard_type){
    case "B":
      return 6;
    case "C":
      return 4;
    case "D":
      return 2;
    default:
      return 8;
  }

  // const priorityCities = ["北京", "天津", "上海", "重庆"];
  // if (priorityCities.some(city => conditionLog.address.includes(city))) {
  //   eValue += 1;
  // }
}


export async function getAllAbilities(studentId: string): Promise<ChartData[]> {
  const abilities: ChartData[] = [];

  try {
    //各维度能力评估
    const studyAbility = await evaluateScore(studentId);
    abilities.push({ dimension: "学业成绩", value: studyAbility });

    const secondCourseAbility = await evaluateSecondCourse(studentId);
    abilities.push({ dimension: "艺术素养", value: secondCourseAbility });

    const awardAbility = await evaluateAward(studentId);
    abilities.push({ dimension: "竞赛获奖", value: awardAbility });

    const conditionAbility = await evaluateCondition(studentId);
    abilities.push({ dimension: "家庭情况", value: conditionAbility });

    return abilities;
  } catch (error) {
    console.error("Failed to fetch all abilities:", error);
    throw new Error("Failed to fetch all abilities");
  }
}
