import { Box } from "@radix-ui/themes";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
	return (
		<Box className="p-5">
			<IssueForm />
		</Box>
	);
};

export default NewIssuePage;

export const metadata: Metadata = {
	title: "Add Issue",
	description: "Add an issue for records",
};
