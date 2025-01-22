import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./_components/IssueChart";
import IssueSummary from "./_components/IssueSummary";
import LatestIssues from "./_components/LatestIssues";

export default async function Home() {
	const open = await prisma.issue.count({
		where: { status: "OPEN" },
	});
	const in_progress = await prisma.issue.count({
		where: { status: "IN_PROGRESS" },
	});
	const closed = await prisma.issue.count({
		where: { status: "CLOSED" },
	});
	return (
		<>
			<Grid columns={{ initial: "1", md: "2" }} gap="5" className="p-5">
				<Flex direction={"column"} gap="5">
					<IssueChart
						open={open}
						in_progress={in_progress}
						closed={closed}
					/>
					<IssueSummary
						open={open}
						in_progress={in_progress}
						closed={closed}
					/>
				</Flex>
				<LatestIssues />
			</Grid>
		</>
	);
}

export const metadata: Metadata = {
	title: "Issue Tracker - Dashboard",
	description: "View a summary of project issues",
};
