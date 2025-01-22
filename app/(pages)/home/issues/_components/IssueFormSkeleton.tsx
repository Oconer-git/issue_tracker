import { Skeleton } from "@/app/_components";
import { Box } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
	return (
		<>
			<Box className="max-w-xl">
				<Skeleton height="1.8rem" />
				<Skeleton height="24rem" />
			</Box>
		</>
	);
};

export default IssueFormSkeleton;
