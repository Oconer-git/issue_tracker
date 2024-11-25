import React from "react";
import { Status } from "@prisma/client";
import { Flex, Card, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueSummary = ({ open, in_progress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: in_progress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap={"3"}>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction={"column"} gap={"1"}>
            <Link
              className="test-sm font-md"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
