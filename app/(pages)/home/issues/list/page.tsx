import Pagination from "@/app/_components/Pagination";
import AuthOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import IssueActions from "./_components/IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
	searchParams: IssueQuery;
}

const IssuePage = async ({ searchParams }: Props) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const orderBy = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" }
		: undefined;

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;

	const where = { status };
	const session = await getServerSession(AuthOptions);
	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const issueCount = await prisma.issue.count({ where });

	return (
		<Flex direction={"column"} gap={"3"} className="p-5">
			{session && <IssueActions />}
			<IssueTable searchParams={searchParams} issues={issues} />
			<Pagination
				itemCount={issueCount}
				pageSize={pageSize}
				currentPage={page}
			/>
		</Flex>
	);
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Issue Tracker - Issue list",
	description: "View all project issues",
};
export default IssuePage;
