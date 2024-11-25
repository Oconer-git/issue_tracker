"use client";
import React from "react";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueChart = ({ open, in_progress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In_progress", value: in_progress },
    { label: "Closed", value: closed },
  ];
  return (
    <>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar
              dataKey="value"
              barSize={60}
              style={{ fill: "var(--accent-9)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default IssueChart;
