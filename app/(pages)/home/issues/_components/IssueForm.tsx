"use client";
import ErrorMessage from "@/app/_components/ErrorMessage";
import Spinner from "@/app/_components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { GiBugleCall, GiProgression } from "react-icons/gi";
import SimpleMDE from "react-simplemde-editor";
import z from "zod";
import { issueSchema } from "../ValidationSchema";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema),
		defaultValues: {
			status: issue?.status || "OPEN",
			title: issue?.title || "",
			description: issue?.description || "",
		},
	});

	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();

	const onSubmit = handleSubmit(async (data) => {
		// console.log(data);
		try {
			setLoading(true);
			if (issue) {
				await axios.patch(`/api/issues/${issue.id}`, data);
			} else {
				await axios.post("/api/issues", data);
			}

			router.push("/home/issues/list");
			router.refresh();
		} catch (error) {
			setLoading(false);
			setError("An unexpected error occurred");
		}
	});

	return (
		<div className="max-w-xl">
			{error && (
				<section className="mb-4">
					<Callout.Root color="red" role="alert">
						<Callout.Text>{error}</Callout.Text>
					</Callout.Root>
				</section>
			)}
			<form className="space-y-2" onSubmit={onSubmit}>
				{/* Select dropdown using React Hook Form Controller */}
				{issue && (
					<Controller
						name="status"
						control={control}
						render={({ field }) => (
							<Select.Root
								size="1"
								value={field.value}
								onValueChange={field.onChange}
							>
								<Select.Trigger className="relative right-0" />
								<Select.Content className="text-[2rem]">
									<Select.Item value="OPEN">
										Open{" "}
										<GiBugleCall className="text-red-600 inline ml-[5px] align-middle" />
									</Select.Item>
									<Select.Item value="IN_PROGRESS">
										In Progress{" "}
										<GiProgression className="text-orange-500 inline ml-[5px] align-middle" />
									</Select.Item>
									<Select.Item value="CLOSED">
										Closed{" "}
										<FaCheckCircle className="text-green-600 inline ml-[5px] align-middle" />
									</Select.Item>
								</Select.Content>
							</Select.Root>
						)}
					/>
				)}
				<ErrorMessage>{errors.status?.message}</ErrorMessage>

				{/* Title input */}
				<TextField.Root>
					<TextField.Input
						placeholder="Title"
						{...register("title")}
					/>
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>

				{/* Description input using SimpleMDE */}
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Description" {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				{/* Submit button */}
				<Button disabled={isLoading}>
					{issue ? "Update Issue" : "Submit New Issue"}
					{isLoading && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
