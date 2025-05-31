import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
} from "../ui/hover-card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState, useEffect, type ReactNode } from "react";
import { Separator } from "../ui/separator";
import { AnimatePresence, motion } from "framer-motion";

type IndexPair = [number, number];

interface CritiqueItem {
	category: string;
	meaning: string;
	critique: string;
}

interface ContentType {
	original_text: string;
	issue_indeces: IndexPair[];
	corrected_text: string;
	correct_indeces: IndexPair[];
	critique: CritiqueItem[];
}

const isMobileDevice = () => window.innerWidth <= 768;

interface HighlightedWordProps {
	word: string;
	critique: CritiqueItem;
	isMobile: boolean;
	highlightColorClass: string;
}

const HighlightedWord = ({
	word,
	critique,
	isMobile,
	highlightColorClass,
}: HighlightedWordProps) => {
	const commonClasses = `font-medium cursor-help px-1 ${highlightColorClass}`;

	if (isMobile) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<span className={commonClasses}>{word}</span>
				</DialogTrigger>
				<DialogContent className="w-80 text-sm dark:text-neutral-50 dark:bg-[#373737] bg-[#fafafa]">
					<p>
						<strong>{critique?.category}</strong>
					</p>
					<Separator />
					<p>{critique?.critique}</p>
				</DialogContent>
			</Dialog>
		);
	} else {
		return (
			<HoverCard>
				<HoverCardTrigger asChild>
					<span className={commonClasses}>{word}</span>
				</HoverCardTrigger>
				<HoverCardContent className="w-80 text-sm dark:text-neutral-50 dark:bg-[#373737] bg-[#fafafa]">
					<p>
						<strong>{critique?.category}</strong>
					</p>
					<Separator className="my-1" />
					<p>{critique?.critique}</p>
				</HoverCardContent>
			</HoverCard>
		);
	}
};

const renderHighlightedText = (
	text: string,
	highlights: IndexPair[],
	critiques: CritiqueItem[],
	isMobile: boolean,
	highlightColorClass: string
): ReactNode => {
	const words = text.trim().split(/\s+/);
	return words.map((word, idx) => {
		const matchIndex = highlights.findIndex(
			([start, end]) => idx >= start && idx < end
		);

		if (matchIndex !== -1 && critiques[matchIndex]) {
			return (
				<HighlightedWord
					key={idx}
					word={word}
					critique={critiques[matchIndex]}
					isMobile={isMobile}
					highlightColorClass={highlightColorClass}
				/>
			);
		}
		return (
			<span key={idx} className="px-1">
				{word}
			</span>
		);
	});
};

const GrammarSection = ({ content }: { content: ContentType }) => {
	const [showCritiques, setShowCritiques] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsMobile(isMobileDevice());
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="space-y-6">
			<div>
				<strong>Original</strong>
				<p className="flex flex-wrap mt-2 leading-relaxed">
					{renderHighlightedText(
						content.original_text,
						content.issue_indeces,
						content.critique,
						isMobile,
						"text-red-700"
					)}
				</p>
			</div>

			<div>
				<strong>Corrected</strong>
				<p className="flex flex-wrap mt-2 leading-relaxed">
					{renderHighlightedText(
						content.corrected_text,
						content.correct_indeces,
						content.critique,
						isMobile,
						"text-green-600"
					)}
				</p>
			</div>

			<div>
				<div className="flex items-end gap-2">
					<strong>Critiques List</strong>
					<button
						onClick={() => setShowCritiques(!showCritiques)}
						className="text-xs cursor-pointer text-blue-500 hover:underline"
					>
						{showCritiques ? "(Hide)" : "(Show)"}
					</button>
				</div>
				<AnimatePresence>
					{showCritiques && (
						<div>
							{content.critique.length > 0 ? (
								<motion.ul
									transition={{ staggerChildren: 0.3 }}
									className="list-disc ml-6 mt-2 text-sm"
								>
									{content.critique.map((c, i) => (
										<motion.li
											initial={{ y: -10, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											exit={{ y: -10, opacity: 0 }}
											transition={{ duration: 0.3 }}
											key={i}
										>
											<strong>{c.category}</strong>:{" "}
											{c.critique}
										</motion.li>
									))}
								</motion.ul>
							) : (
								<motion.div
									initial={{ y: -10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -10, opacity: 0 }}
									transition={{ duration: 0.3 }}
									className="ml-6 mt-2 text-sm text-muted-foreground"
								>
									No modifications found.
								</motion.div>
							)}
						</div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default GrammarSection;
