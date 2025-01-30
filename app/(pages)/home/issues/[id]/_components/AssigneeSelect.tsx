"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { data: users, error, isLoading } = useUsers();

	if (isLoading) return <Skeleton height={31} />;
	if (error) return null;

	const assignedIssue = (userId: string) => {
		axios
			.patch(`/api/issues/${issue.id}`, {
				status: issue.status,
				assignedToUserId: userId || null,
			})
			.catch((error) => {
				console.log(error);
				toast.error("Changes could not be saved");
			});
	};
	return (
		<>
			<Select.Root
				defaultValue={issue.assignedToUserId || ""}
				onValueChange={assignedIssue}
			>
				<Select.Trigger placeholder="Assign..." />
				<Select.Content>
					<Select.Group className="p-[5px]">
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value="">Unassigned</Select.Item>
						{users?.map((user) => (
							<Select.Item key={user.id} value={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

const useUsers = () =>
	useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => axios.get("/api/users").then((res) => res.data),
		staleTime: 60 * 1000, //60s
		retry: 3,
	});
export default AssigneeSelect;
