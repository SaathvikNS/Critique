import {
	Accordion,
	AccordionContent,
	AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useThemeStore } from "@/store/themeStore";
import CustomAccordionTrigger from "@/components/CustomAccordionTrigger";
import api from "@/components/api";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import GrammarSection from "@/components/TextComponents/GrammarSection";
import ReadabilitySection from "@/components/TextComponents/ReadabilitySection";
import ToneSection from "@/components/TextComponents/ToneSection";
import KeywordSection from "@/components/TextComponents/KeywordSection";
import SummarySection from "@/components/TextComponents/SummarySection";
import TopicSection from "@/components/TextComponents/TopicSection";
import EntitySection from "@/components/TextComponents/EntitySection";
import type {
	EntityContentType,
	GrammarContentType,
	KeywordContentType,
	ReadabilityContentType,
	SectionKey,
	SummaryContentType,
	ToneContentType,
	TopicContentType,
} from "@/utils/TextContentTypes";
// import {
// 	Tooltip,
// 	TooltipContent,
// 	TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { RotateCw } from "lucide-react";

const TextPage = () => {
	const { theme } = useThemeStore();

	const [analyzing, setAnalyzing] = useState<boolean>(false);
	const [move, setMove] = useState<boolean>(false);
	const [moved, setMoved] = useState<boolean>(false);

	const [text, setText] = useState<string>("");

	const sections = [
		{ key: "grammar", title: "Grammar and Spelling Correction" },
		{ key: "readability", title: "Readability Analysis" },
		{ key: "tone", title: "Tone Analysis" },
		{ key: "summary", title: "Summarization" },
		{ key: "keyword", title: "Keyword Extraction and Density Analysis" },
		{ key: "topic", title: "Topic Detection" },
		{ key: "entity", title: "Entity Recognition" },
	];

	const [sectionData, setSectionData] = useState(
		Object.fromEntries(
			sections.map((s) => [s.key, { loading: false, content: "" }])
		)
	);

	const sectionComponents: {
		grammar: React.FC<{ content: GrammarContentType }>;
		readability: React.FC<{ content: ReadabilityContentType }>;
		tone: React.FC<{ content: ToneContentType }>;
		summary: React.FC<{ content: SummaryContentType }>;
		keyword: React.FC<{ content: KeywordContentType }>;
		topic: React.FC<{ content: TopicContentType }>;
		entity: React.FC<{ content: EntityContentType }>;
	} = {
		grammar: GrammarSection,
		readability: ReadabilitySection,
		tone: ToneSection,
		summary: SummarySection,
		keyword: KeywordSection,
		topic: TopicSection,
		entity: EntitySection,
	};

	const handleCritiquePress = async () => {
		if (text === "") {
			toast.info("Please fill the text field");
			return;
		}
		try {
			setAnalyzing(true);

			setSectionData((prev) =>
				Object.fromEntries(
					Object.keys(prev).map((key) => [
						key,
						{ ...prev[key], loading: true },
					])
				)
			);

			// wait for promise
			const grammarPromise = api.post("/api/text/grammar-analysis", {
				text,
			});

			// initiate parallel calls
			const originalTextEndpoints = {
				readability: "api/text/readability-analysis",
				tone: "api/text/tone-analysis",
				entity: "api/text/entity-recognition",
				topic: "/api/text/topic-detection",
			};

			Object.entries(originalTextEndpoints).forEach(
				async ([key, endpoint]) => {
					try {
						const res = await api.post(endpoint, { text });

						console.log(key);
						console.log(res.data);

						setSectionData((prev) => ({
							...prev,
							[key]: {
								loading: false,
								content: res.data,
							},
						}));
					} catch (err) {
						setSectionData((prev) => ({
							...prev,
							[key]: {
								loading: false,
								content: `Error: ${(err as Error).message}`,
							},
						}));
					}
				}
			);

			// await necessay response
			let correctedText = text;

			try {
				const grammarResponse = await grammarPromise;
				correctedText = grammarResponse.data.corrected_text;

				console.log("grammar");
				console.log(grammarResponse.data);

				setSectionData((prev) => ({
					...prev,
					grammar: {
						loading: false,
						content: grammarResponse.data,
					},
				}));
			} catch (err) {
				setSectionData((prev) => ({
					...prev,
					grammar: {
						loading: false,
						content: `Error: ${(err as Error).message}`,
					},
				}));
			}

			// initiate awaited calls
			const correctedTextEndpoints = {
				keyword: "api/text/keyword-analysis",
				summary: "/api/text/summary",
			};

			Object.entries(correctedTextEndpoints).forEach(
				async ([key, endpoint]) => {
					try {
						const res = await api.post(endpoint, {
							text: correctedText,
						});

						console.log(key);
						console.log(res.data);

						setSectionData((prev) => ({
							...prev,
							[key]: {
								loading: false,
								content: res.data,
							},
						}));
					} catch (err) {
						setSectionData((prev) => ({
							...prev,
							[key]: {
								loading: false,
								content: `Error: ${(err as Error).message}`,
							},
						}));
					}
				}
			);
		} catch (e) {
			toast.error((e as Error).message);
		}
	};

	const handleGetSample = async () => {
		try {
			const response = await api.get("/api/text/get-sample");
			setText(response.data);
		} catch (e) {
			toast.error((e as Error).message);
		}
	};

	return (
		<div className="flex flex-col items-center h-full">
			{/* Title */}
			<motion.h1
				initial={false}
				animate={{ marginTop: !move ? "8rem" : 0 }}
				exit={{ marginTop: "1rem" }}
				transition={{ duration: 0.5 }}
				onAnimationComplete={() => {
					setMoved(true);
				}}
				className={`select-none font-bold tracking-wide text-2xl dark:text-foreground text-neutral-700 mb-5 mt-40 ${
					moved ? "sticky" : ""
				} ${moved ? "top-0" : ""} ${
					moved ? "z-2" : ""
				} dark:bg-[#262626] bg-background w-full flex justify-center h-max py-2`}
			>
				{/* <AnimatePresence>
					{moved && (
						<motion.button
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute top-0 right-0"
							onClick={() => {
								localStorage.setItem("activeTab", tab);
								window.location.reload();
							}}
						>
							<Tooltip>
								<TooltipTrigger>
									<RotateCw />
								</TooltipTrigger>
								<TooltipContent side="left">
									<p>Reset</p>
								</TooltipContent>
							</Tooltip>
						</motion.button>
					)}
				</AnimatePresence> */}
				Text Analysis
			</motion.h1>

			{/* Para */}
			<AnimatePresence>
				{!analyzing && (
					<motion.p
						initial={false}
						animate={{
							opacity: 1,
							height: "auto",
							marginTop: "1rem",
						}}
						exit={{ opacity: 0, height: 0, marginTop: 0 }}
						transition={{ duration: 0.5 }}
						className="w-2/3 pl-2 select-none mt-4 sm:block hidden text-sm"
					>
						Please enter the text to be analysed
					</motion.p>
				)}
			</AnimatePresence>

			{/* TextArea */}
			<Textarea
				className="sm:w-2/3 sm:max-h-50 max-h-100 sm:mt-1 [scrollbar-width:none]"
				placeholder="Enter your text here...."
				value={text}
				onChange={(e) => {
					setText(e.target.value);
				}}
				disabled={analyzing}
			/>

			{/* Buttons */}
			<AnimatePresence>
				{!analyzing && (
					<motion.div
						initial={false}
						animate={{ opacity: 1 }}
						onAnimationComplete={() => {
							setTimeout(() => {
								setMove(true);
							}, 500);
						}}
						exit={{ opacity: 0 }}
						className="mt-4 sm:w-2/3 w-full flex justify-between"
					>
						<Button
							onClick={handleGetSample}
							variant={"link"}
							className="text-xs cursor-pointer"
						>
							Click here to use sample text
						</Button>
						<Button
							onClick={handleCritiquePress}
							className="bg-neutral-600 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-600 rounded-3xl h-8 cursor-pointer"
						>
							Critique
						</Button>
					</motion.div>
				)}
			</AnimatePresence>

			{/* seperator */}
			<AnimatePresence>
				{moved && (
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: moved ? "100%" : 0 }}
						exit={{ width: "100%" }}
						transition={{ duration: 0.5 }}
						className="w-3/4 mt-5 flex justify-center"
					>
						<div className="h-full w-full sm:w-3/4">
							<Separator className="bg-border" />
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Accordians */}
			<AnimatePresence>
				{moved && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 1, y: -10 }}
						transition={{ duration: 0.5 }}
						className=" w-full sm:w-2/3 mt-5"
					>
						<Accordion type="multiple">
							{Object.entries(sectionData).map(
								([key, { loading, content }]) => {
									const typedkey = key as SectionKey;
									const SectionComponent =
										sectionComponents[typedkey];
									const SectionLabel = sections.find(
										(section) => section.key === key
									);

									return (
										<AccordionItem
											key={key}
											value={key}
											className="my-4 w-full"
										>
											<CustomAccordionTrigger
												title={
													SectionLabel?.title || key
												}
												loading={loading}
												theme={theme}
											/>
											<AccordionContent className="p-4 dark:bg-[#2b2b2b] bg-[#f8f1fc] dark:text-foreground text-neutral-700 w-full">
												<SectionComponent
													content={content}
												/>
											</AccordionContent>
										</AccordionItem>
									);
								}
							)}
						</Accordion>
					</motion.div>
				)}
			</AnimatePresence>
			<Toaster richColors />
		</div>
	);
};

export default TextPage;
