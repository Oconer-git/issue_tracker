import NavBar from "@/app/_components/NavBar";
import AuthProvider from "@/app/auth/Provider";
import "@/app/globals.css";
import QueryClientProvider from "@/app/QueryClientProvider";
import "@/app/theme-config.css";
import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
	title: "Issue tracker | Home",
	description: "Issue tracker",
};

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.variable}>
				<QueryClientProvider>
					<AuthProvider>
						<Theme accentColor="ruby">
							<NavBar />
							<main>
								<Container>{children}</Container>
							</main>
						</Theme>
					</AuthProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
