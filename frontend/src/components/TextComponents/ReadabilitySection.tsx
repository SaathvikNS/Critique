import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";
import { AnimatePresence, motion } from "framer-motion";
import RadialScore from "../RadialScore";
import { Badge } from "../ui/badge";
import type {
	HighlightedWordProps,
	ReadabilityContentType,
} from "@/utils/TextContentTypes";

const isMobileDevice = () => window.innerWidth <= 768;

const HighlightedWord = ({
	original_word,
	suggestion_array,
	isMobile,
}: HighlightedWordProps) => {
	if (isMobile) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<span className=" cursor-pointer">{original_word}</span>
				</DialogTrigger>
				<DialogContent className="w-80 text-sm dark:text-neutral-50 dark:bg-[#373737] bg-[#fafafa]">
					<p>
						<strong>Better Choices</strong>
					</p>
					<Separator />
					<div>
						{suggestion_array.map((suggestion, index) => (
							<div key={index}>• {suggestion}</div>
						))}
					</div>
				</DialogContent>
			</Dialog>
		);
	} else {
		return (
			<HoverCard>
				<HoverCardTrigger asChild>
					<span className=" cursor-pointer">{original_word}</span>
				</HoverCardTrigger>
				<HoverCardContent className="w-80 text-sm dark:text-neutral-50 dark:bg-[#373737] bg-[#fafafa]">
					<p>
						<strong>Better Choices</strong>
					</p>
					<Separator />
					<div>
						{suggestion_array.map((suggestion, index) => (
							<div key={index}>• {suggestion}</div>
						))}
					</div>
				</HoverCardContent>
			</HoverCard>
		);
	}
};

const ReadabilitySection = ({
	content,
}: {
	content: ReadabilityContentType;
}) => {
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [showWords, setShowWords] = useState<boolean>(false);

	const readability = content[0];
	const suggestions = content[1];

	const { reading_ease, standard_grade, reading_time } = readability;

	const formatTime = ({ seconds }: { seconds: number }) => {
		const min = Math.floor(seconds / 60);
		const sec = Math.round(seconds % 60);

		return min > 0 ? `${min} min. ${sec} sec.` : `${sec} sec.`;
	};

	useEffect(() => {
		const handleResize = () => setIsMobile(isMobileDevice());
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="w-full h-max">
			<div className="w-full flex justify-around">
				{/* Readability Score */}
				<div className="flex flex-col items-center w-[45%]">
					<p className="font-semibold">Readability Score</p>
					<RadialScore
						score={Math.max(0, Math.min(100, reading_ease))}
					/>
				</div>

				<div>
					<Separator orientation="vertical" className="bg-border" />
				</div>

				{/* right half */}
				<div className="px-5 flex flex-col justify-center w-[45%]">
					{/* grade level */}
					<div className="h-[40%] flex flex-col items-center">
						<p className="text-sm font-semibold">
							Standard Grade Level:
						</p>
						<Badge className="text-xs h-max w-max bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 mt-2">
							{standard_grade}
						</Badge>
					</div>

					{/* reading time */}
					<div className="h-[40%] flex flex-col items-center">
						<p className="text-sm font-semibold">
							Average Reading Time:
						</p>
						<Badge className="text-xs h-max w-max bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 mt-2">
							{formatTime({ seconds: reading_time })}
						</Badge>
					</div>
				</div>
			</div>

			<Separator className="my-5" />

			<div>
				<div className="flex items-end gap-2">
					<div className="font-semibold">Some Complex Words Used</div>
					<button
						className="text-xs cursor-pointer text-blue-500 hover:underline"
						onClick={() => setShowWords(!showWords)}
					>
						{showWords ? "(Hide)" : "(Show)"}
					</button>
				</div>

				<AnimatePresence mode="wait">
					{showWords && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 10 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="mb-5"
						>
							<motion.p className="text-xs text-muted-foreground">
								{isMobile ? (
									<span>Click</span>
								) : (
									<span>Hover</span>
								)}{" "}
								to see similar words with comparitively higher
								readability. shorter sentences with simpler
								words increase the readability
							</motion.p>
							<motion.ul className="list-disc mt-5 ml-6 grid w-full gap-1 [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]">
								{suggestions.map((item, index) => (
									<li key={index}>
										<HighlightedWord
											original_word={item.word}
											suggestion_array={item.suggestions}
											isMobile={isMobile}
										/>
									</li>
								))}
							</motion.ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default ReadabilitySection;
