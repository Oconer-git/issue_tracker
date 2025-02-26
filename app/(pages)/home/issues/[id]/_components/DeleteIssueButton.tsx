"use client";
import { Spinner } from "@/app/_components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [isDeleting, setDeleting] = useState(false);

	const DeleteIssue = async () => {
		try {
			setDeleting(true);
			await axios.delete(`/api/issues/${issueId}`);
			router.push("/home/issues/list");
			router.refresh();
		} catch (error) {
			setDeleting(false);
			setError(true);
		}
	};
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button disabled={isDeleting} color="red">
						Delete {isDeleting && <Spinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete this issue? This action
						cannot be undone.
					</AlertDialog.Description>
					<Flex gap="3" mt="4">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={DeleteIssue}>
								Delete
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						This issue could not be deleted
					</AlertDialog.Description>
					<Button
						color="gray"
						variant="soft"
						onClick={() => setError(false)}
					>
						Ok
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
