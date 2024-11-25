import React, { cache } from "react";
import prisma from "@/prisma/client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) return null;

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: "Edit " + issue?.title,
    description: "Edit issue " + issue?.id,
  };
}
