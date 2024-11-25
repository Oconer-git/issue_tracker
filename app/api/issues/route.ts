import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../ValidationSchema";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/AuthOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const createdIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });

  return NextResponse.json(createdIssue, { status: 201 });
}