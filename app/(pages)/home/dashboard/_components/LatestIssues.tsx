import { IssueStatusBadge } from "@/app/_components";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";

const LatestIssues = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: { createdAt: "desc" },
		take: 10,
		include: {
			assignedToUser: true,
		},
	});

	return (
		<Card>
			<Heading size="4" mb="5">
				Latest Issues
			</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Flex justify={"between"}>
									<Flex direction={"column"} align={"start"}>
										<Link href={`issues/${issue.id}`}>
											{issue.title.toString()}
										</Link>
										<IssueStatusBadge
											status={issue.status}
										/>
									</Flex>
									{issue.assignedToUser && (
										<Avatar
											size="2"
											radius="full"
											src={issue.assignedToUser.image!}
											fallback
										/>
									)}
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	);
};

export default LatestIssues;
