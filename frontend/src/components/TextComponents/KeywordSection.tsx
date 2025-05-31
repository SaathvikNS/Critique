import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import RadialScore from "../RadialScore";

interface ContentType {
	word_count: Record<string, number>;
	phrases: string[];
	keywords: string[];
	syllable_count: number;
	lexicon_count: number;
	sentence_count: number;
	character_count: number;
	average_words_per_sentence: number;
	unique_words: string[];
	type_token_ratio: number;
}

const KeywordSection = ({ content }: { content: ContentType }) => {
	const filteredWordCount: Record<string, number> = {};

	for (const [word, count] of Object.entries(content.word_count)) {
		if (count >= 2) {
			filteredWordCount[word] = count;
		}
	}

	const [showFrequent, setShowFrequent] = useState<boolean>(false);
	const [showKeyword, setShowKeyword] = useState<boolean>(false);
	const [showPhrase, setShowPhrase] = useState<boolean>(false);

	return (
		<div>
			{/* row 1 */}
			<div className="flex justify-between">
				{/* frequently used words */}
				<div className="w-[45%]">
					<div className="flex items-end gap-2">
						<div className="font-semibold">
							Frequently Used Words
						</div>{" "}
						<button
							className="text-xs cursor-pointer text-blue-500 hover:underline"
							onClick={() => setShowFrequent(!showFrequent)}
						>
							{showFrequent ? "(Hide)" : "(Show)"}
						</button>
					</div>
					{Object.keys(filteredWordCount).length > 0 ? (
						<AnimatePresence mode="wait">
							{showFrequent && (
								<motion.ul
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3 }}
									className="list-disc pl-6 pt-3 mt-4 grid w-full gap-1 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]"
								>
									{Object.entries(filteredWordCount).map(
										([word, count], index) => (
											<li key={index}>
												{word} - {count} times
											</li>
										)
									)}
								</motion.ul>
							)}
						</AnimatePresence>
					) : (
						<AnimatePresence mode="wait">
							{showFrequent && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3 }}
									className="list-disc pl-6 pt-3 text-muted-foreground"
								>
									Nothing to show here
								</motion.div>
							)}
						</AnimatePresence>
					)}
				</div>

				<div>
					<Separator orientation="vertical" className="bg-border" />
				</div>

				{/* unique words list */}
				<div className="w-[45%]">
					<div className="flex items-end gap-2">
						<div className="font-semibold">Unique Words Used</div>
						<button
							className="text-xs cursor-pointer text-blue-500 hover:underline"
							onClick={() => setShowFrequent(!showFrequent)}
						>
							{showFrequent ? "(Hide)" : "(Show)"}
						</button>
					</div>
					{content.unique_words.length > 0 ? (
						<AnimatePresence mode="wait">
							{showFrequent && (
								<motion.ul
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3 }}
									className="list-disc pl-6 pt-3 mt-4 grid w-full gap-1 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]"
								>
									{content.unique_words.map((word, index) => (
										<li key={index}>{word}</li>
									))}
								</motion.ul>
							)}
						</AnimatePresence>
					) : (
						<AnimatePresence mode="wait">
							{showFrequent && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3 }}
									className="list-disc pl-6 pt-3 text-muted-foreground"
								>
									Nothing to show here
								</motion.div>
							)}
						</AnimatePresence>
					)}
				</div>
			</div>

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			{/* keywords list */}
			<div>
				<div className="flex items-end gap-2">
					<div className="font-semibold">Keywords List</div>
					<button
						className="text-xs cursor-pointer text-blue-500 hover:underline"
						onClick={() => setShowKeyword(!showKeyword)}
					>
						{showKeyword ? "(Hide)" : "(Show)"}
					</button>
				</div>
				<AnimatePresence>
					{showKeyword && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="mt-4 grid w-full gap-1 [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]"
						>
							{content.keywords.map((word, index) => (
								<div key={index} className="px-1">
									• {word}
								</div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			{/* Phrase list */}
			<div>
				<div className="flex items-end gap-2">
					<div className="font-semibold">
						Common Literary Phrases used
					</div>
					<button
						className="text-xs cursor-pointer text-blue-500 hover:underline"
						onClick={() => setShowPhrase(!showPhrase)}
					>
						{showPhrase ? "(Hide)" : "(Show)"}
					</button>
				</div>
				<AnimatePresence>
					{showPhrase && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="mt-4 grid w-full gap-1 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]"
						>
							{content.phrases.map((word, index) => (
								<div key={index} className="px-1">
									• {word}
								</div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			{/* Word Analysis Numbers */}
			<div className="flex flex-col">
				<div className="font-semibold self-center">
					Density Analysis
				</div>
				<div className="mt-5 grid w-full gap-2 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
					<Badge className="w-full bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
						Syllable Count - {content.syllable_count}
					</Badge>
					<Badge className="w-full bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
						Lexicon Count - {content.lexicon_count}
					</Badge>
					<Badge className="w-full bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
						Sentence Count - {content.sentence_count}
					</Badge>
					<Badge className="w-full bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
						Character Count - {content.character_count}
					</Badge>
					<Badge className="w-full bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
						Words / Sentence -{" "}
						{Math.round(content.average_words_per_sentence * 100) /
							100}
					</Badge>
				</div>
			</div>

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			{/* ttr analysis */}
			<div className="w-full h-40 mb-5">
				<div className="text-center font-semibold">
					Text-Token-Ratio
				</div>
				<div className="flex items-center mt-5">
					<RadialScore score={content.type_token_ratio} />
					<div className="flex flex-col items-center">
						{content.type_token_ratio > 50 ? (
							<Badge className="text-xs h-max w-max bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
								Very High Lexical Diversity
							</Badge>
						) : content.type_token_ratio > 40 ? (
							<Badge className="text-xs h-max w-max bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
								High Lexical Diversity
							</Badge>
						) : content.type_token_ratio > 30 ? (
							<Badge className="text-xs h-max w-max bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
								Moderate Lexical Diversity
							</Badge>
						) : content.type_token_ratio > 20 ? (
							<Badge className="text-xs h-max w-max bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
								Low Lexical Diversity
							</Badge>
						) : (
							<Badge className="text-xs h-max w-max bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
								Very Low Lexical Diversity
							</Badge>
						)}
						<p className="mt-5 mx-5 text-center">
							Shows how diverse the vocabulary used are. Often
							used to measure creativity.
						</p>
					</div>
				</div>
			</div>

			<div className="my-5">
				<Separator className="dark:bg-[#2b2b2b] bg-[#f8f1fc]" />
			</div>
		</div>
	);
};

export default KeywordSection;
