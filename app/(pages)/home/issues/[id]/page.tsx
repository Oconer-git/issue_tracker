import AuthOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./_components/AssigneeSelect";
import DeleteIssueButton from "./_components/DeleteIssueButton";
import EditIssueButton from "./_components/EditIssueButton";
import IssueDetails from "./_components/IssueDetails";

interface Props {
	params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
	prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailpage = async ({ params }: Props) => {
	const session = await getServerSession(AuthOptions);
	// Validate if the `id` is a number
	const id = parseInt(params.id, 10);
	if (isNaN(id)) {
		notFound(); // Show "not found" for invalid `id` parameters
	}

	const issue = await fetchIssue(parseInt(params.id));

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: "1", sm: "5" }} gap="5" className="p-5">
			<Box className="md:col-span-4">
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Box>
					<Flex direction="column" gap="4">
						<AssigneeSelect issue={issue} />
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export async function generateMetadata({ params }: Props) {
	const issue = await fetchIssue(parseInt(params.id));

	return {
		title: issue?.title,
		description: "Details of issue " + issue?.id,
	};
}

export default IssueDetailpage;
