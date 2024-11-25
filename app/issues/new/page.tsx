import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;

export const metadata: Metadata = {
  title: "Add Issue",
  description: "Add an issue for records",
};
