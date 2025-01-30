import { Box, Heading } from "@radix-ui/themes";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
	return (
		<Box>
			<Heading size="7" my="4">
				Add new issue
			</Heading>
			<IssueForm />
		</Box>
	);
};

export default NewIssuePage;

export const metadata: Metadata = {
	title: "Add Issue",
	description: "Add an issue for records",
};
