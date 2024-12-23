"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ChartData {
  dimension: string;
  value: number;
}

async function evaluateScore(studentId: string) {
  const grade = await prisma.grade.findUnique({
    where: {
      student_id: studentId,
    },
  });

  const averageGpa = grade ? grade.average_gpa / 10 : 8.12;
  return averageGpa;
}

export async function getAllAbilities(studentId: string): Promise<ChartData[]> {
  const abilities: ChartData[] = [];

  try {
    // 调用各个能力获取函数并组合结果
    const studyAbility = await evaluateScore(studentId);
    abilities.push({ dimension: "学业水平", value: studyAbility });

    // 其他能力（示例）
    abilities.push({ dimension: "能力2", value: 10 });
    abilities.push({ dimension: "能力3", value: 5 });
    return abilities;
  } catch (error) {
    console.error("Failed to fetch all abilities:", error);
    throw new Error("Failed to fetch all abilities");
  }
}

//获取成绩水平能力值
export async function getAverageGpa(studentId: string): Promise<object> {
  try {
    const grade = await prisma.grade.findUnique({
      where: {
        student_id: studentId,
      },
    });

    //兜底：如果查不到这个人成绩返回8
    const evaluateScore = grade ? grade.average_gpa : 8;

    return { dimension: "学业水平", value: evaluateScore };
  } catch (error) {
    console.error("Failed to fetch average GPA:", error);
    throw new Error("Failed to fetch average GPA");
  }
}

export async function getAbility2(studentId: string): Promise<object> {
  try {
    return { dimension: "水平2", value: 10 };
  } catch (error) {
    console.error("Failed to fetch average GPA:", error);
    throw new Error("Failed to fetch average GPA");
  }
}

export async function getAbility3(studentId: string): Promise<object> {
  try {
    return { dimension: "水平3", value: 4 };
  } catch (error) {
    console.error("Failed to fetch average GPA:", error);
    throw new Error("Failed to fetch average GPA");
  }
}