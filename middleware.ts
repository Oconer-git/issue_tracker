export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/home/issues/edit/:id+", "/home/issues/new"],
};
