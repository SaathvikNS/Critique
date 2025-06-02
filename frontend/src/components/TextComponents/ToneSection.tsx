import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import type { ToneContentType } from "@/utils/TextContentTypes";

const highlightKeywords = (text: string, keywords: string[]) => {
	const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
	const parts = text.split(regex);

	return parts.map((part, index) =>
		keywords.includes(part.toLowerCase()) ? (
			<span key={index} className="font-bold">
				{part}
			</span>
		) : (
			part
		)
	);
};

const ToneSection = ({ content }: { content: ToneContentType }) => {
	const [showCurrentExample, setShowCurrentExample] =
		useState<boolean>(false);

	return (
		<div>
			{highlightKeywords(content.tone[0], content.tone[1])}

			<p className="text-xs text-muted-foreground mt-4">
				Take a look at what follows – it'll show you how picking
				different words and usage of punctuation can change the whole
				feel of a sentence, even if it means the exact same thing.
			</p>

			<div>
				<div className="flex items-end mt-2 gap-2">
					<div className="font-semibold">Examples</div>
					<button
						className="text-xs cursor-pointer text-blue-500 hover:underline"
						onClick={() =>
							setShowCurrentExample(!showCurrentExample)
						}
					>
						{showCurrentExample ? "(Hide)" : "(Show)"}
					</button>
				</div>

				<AnimatePresence mode="wait">
					{showCurrentExample && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: -0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.5 }}
							className="mt-2"
						>
							<Table>
								<TableHeader>
									{Object.entries(
										content.current_tone_example
									).map(([tone, example], index) => (
										<TableRow
											key={index}
											className="dark:bg-[#373737] bg-[#e7e0eb] font-semibold hover:bg-[#e7e0eb]"
										>
											<TableHead>
												{tone.charAt(0).toUpperCase() +
													tone.slice(1)}
											</TableHead>
											<TableHead>{example}</TableHead>
										</TableRow>
									))}
								</TableHeader>
								<TableBody>
									{Object.entries(
										content.other_tone_example
									).map(([tone, example], index) => (
										<TableRow key={index} className="h-1">
											<TableCell>
												{tone.charAt(0).toUpperCase() +
													tone.slice(1)}
											</TableCell>
											<TableCell>{example}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default ToneSection;
