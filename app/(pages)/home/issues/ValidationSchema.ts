import z from "zod";
// enum Status {
//     OPEN
//     IN_PROGRESS
//     CLOSED
//   }

import { Status } from "@prisma/client";

export const issueSchema = z.object({
	title: z.string().min(1, "title is required").max(255),
	status: z.enum(Object.values(Status) as [Status, ...Status[]]),
	description: z.string().min(1, "description is required").max(65535),
});

export const patchIssueSchema = z.object({
	title: z.string().min(1, "title is required").max(255).optional(),
	description: z
		.string()
		.min(1, "description is required")
		.max(65535)
		.optional(),
	assignedToUserId: z
		.string()
		.min(1, "AssignedToUserId is required")
		.max(255)
		.optional()
		.nullable(),
	status: z.enum(Object.values(Status) as [Status, ...Status[]]),
});
