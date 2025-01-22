import { Anton } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { FaForward } from "react-icons/fa";

import AnimatedText from "./_components/AnimatedText";

const anton = Anton({
	subsets: ["latin"],
	weight: "400", // Correct syntax for specifying weights
});

const page = () => {
	return (
		<>
			<div className="bg-hero-pattern w-full bg-cover bg-no-repeat h-screen">
				<div className="bg-white/90 absolute top-0 w-full h-screen">
					<section className="px-[20px] md:px-[100px] pt-[40px] md:pt-[60px] ">
						<div className="flex flex-row items-center">
							<h1 className="font-anton text-[40px] md:text-[80px]">
								Issue Tracker
							</h1>
							<AiFillBug className="text-[#e64665] text-[60px] ml-[5px]" />
						</div>
						<div className="font-special text-[20px]  h-[50px] md:text-[30px] xl:text-[32px] relative z-50 text-slate-900">
							<AnimatedText />
						</div>
						<div className="w-full flex flex-col md:flex-row md:w-8/12 items-center gap-2 mt-[15px]">
							<Image
								src="/issue_tracker.png"
								width={1200}
								height={800}
								alt="issue tracker"
								className="w-full sm:w-7/12"
							/>
							<div className="flex flex-col gap-[5px]">
								<p className="font-roboto text-stone-900 text-[16px]">
									Streamline your workflow with our Issue
									Tracker – effortlessly manage tasks, track
									progress, set deadlines, and assign issues
									to developers, all in one intuitive
									platform. Boost productivity and ensure
									nothing falls through the cracks with
									real-time updates and easy collaboration.
								</p>
								<Link href={"/home/dashboard"}>
									<button
										className="rounded-md w-[120px] h-[40px] text-white font-bold
										bg-[#e64665] flex flex-row items-center justify-center gap-3"
									>
										Test <FaForward />
									</button>
								</Link>
							</div>
						</div>
					</section>
					<Image
						src="/big_bug.png"
						width={1200}
						height={1200}
						className="w-7/12 sm:w-5/12 md:w-4/12 hidden md:block md:absolute right-0 bottom-0"
						alt="bug"
					/>
				</div>

				<h1 className="text-gray-100">Text</h1>
			</div>
		</>
	);
};

export default page;
