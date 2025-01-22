"use client";
import { Skeleton } from "@/app/_components";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from "@radix-ui/themes";

const NavBar = () => {
	return (
		<nav className="border-b mb-5 py-3 px-3 bg-[#1d283b]">
			<Container>
				<Flex justify="between">
					<Flex align={"center"} gap="3">
						<AiFillBug className="text-red-400" />
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

const NavLinks = () => {
	const currentPath = usePathname();

	const links = [
		{ label: "Dashboard", href: "/home/dashboard" },
		{ label: "Issues", href: "/home/issues/list" },
	];
	return (
		<ul className="flex space-x-6">
			{links.map((link) => (
				<li key={link.href}>
					<Link
						className={classnames({
							"!text-white": currentPath === link.href,
							"nav-link": true,
						})}
						href={link.href}
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === "loading")
		return (
			<Skeleton width="1.6rem" height="1.6rem" borderRadius={"100%"} />
		);
	if (status === "unauthenticated")
		return (
			<Link href="/api/auth/signin" className="nav-link">
				Login
			</Link>
		);

	return (
		<Box>
			{status === "authenticated" && (
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar
							src={session!.user?.image!}
							fallback="?"
							size="2"
							radius="full"
							className="cursor-pointer"
							referrerPolicy="no-referrer"
						/>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>
							<Text size="2">{session.user?.email}</Text>
						</DropdownMenu.Label>
						<DropdownMenu.Item>
							<Link href="/api/auth/signout">Log out</Link>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			)}
		</Box>
	);
};
export default NavBar;
