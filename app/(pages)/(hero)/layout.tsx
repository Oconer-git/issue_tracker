import "@/app/globals.css";
import "@/app/theme-config.css";
import "@radix-ui/themes/styles.css";

export const metadata = {
	title: "Start Issue Tracker",
	description: "Generated by Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
