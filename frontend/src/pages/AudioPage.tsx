import api from "@/components/api";
import ClaritySection from "@/components/AudioComponents/ClaritySection";
import EntitySection from "@/components/AudioComponents/EntitySection";
import MusicalSection from "@/components/AudioComponents/MusicalSection";
import SummarySection from "@/components/AudioComponents/SummarySection";
import ToneSection from "@/components/AudioComponents/ToneSection";
import TopicSection from "@/components/AudioComponents/TopicSection";
import TranscriptionSection from "@/components/AudioComponents/TranscriptionSection";
import CustomAccordionTrigger from "@/components/CustomAccordionTrigger";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useThemeStore } from "@/store/themeStore";
import type {
	ClaritySectionType,
	EntitySectionType,
	MusicalSectionType,
	SectionKey,
	SummarySectionType,
	ToneSectionType,
	TopicSectionType,
	TranscriptionSectionType,
} from "@/utils/AudioTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const AudioPage = () => {
	const { theme } = useThemeStore();

	const inputRef = useRef<HTMLInputElement | null>(null);
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [audioPreview, setAudioPreview] = useState<string | null>(null);
	const [analyzing, setAnalyzing] = useState<boolean>(false);
	const [move, setMove] = useState<boolean>(false);
	const [moved, setMoved] = useState<boolean>(false);

	const sections = [
		{ key: "transcription", title: "Audio Transcription" },
		{ key: "summary", title: "Summary" },
		{ key: "tone", title: "Tone Analysis" },
		{ key: "topic", title: "Topic Detection" },
		{ key: "entity", title: "Entity Recognition" },
		{ key: "clarity", title: "Clarity Score" },
		{ key: "musical", title: "Musical Entities" },
	];

	const [sectionData, setSectionData] = useState(
		Object.fromEntries(
			sections.map((s) => [s.key, { loading: false, content: "" }])
		)
	);

	const sectionComponents: {
		transcription: React.FC<{ content: TranscriptionSectionType }>;
		summary: React.FC<{ content: SummarySectionType }>;
		tone: React.FC<{ content: ToneSectionType }>;
		topic: React.FC<{ content: TopicSectionType }>;
		entity: React.FC<{ content: EntitySectionType }>;
		clarity: React.FC<{ content: ClaritySectionType }>;
		musical: React.FC<{ content: MusicalSectionType }>;
	} = {
		transcription: TranscriptionSection,
		summary: SummarySection,
		tone: ToneSection,
		topic: TopicSection,
		entity: EntitySection,
		clarity: ClaritySection,
		musical: MusicalSection,
	};

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith("audio/")) {
			setAudioFile(file);
			setAudioPreview(URL.createObjectURL(file));
		} else {
			toast.error("Please select a valid audio file.");
		}
	};

	const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("audio/")) {
			setAudioFile(file);
			setAudioPreview(URL.createObjectURL(file));
		} else {
			toast.error("Please drop a valid audio file.");
		}
	}, []);

	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const clearAudio = () => {
		setAudioFile(null);
		setAudioPreview(null);
	};

	const handleAnalyzePress = async () => {
		if (!audioFile) {
			toast.info("Please upload or drop an audio file first");
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

			const formData = new FormData();
			formData.append("file", audioFile);

			//wait for promise
			const transcriptionPromise = api.post(
				"/api/audio/audio-transcription",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			//initiate parallel calls
			const audioEndpoints = {
				musical: "/api/audio/musical-element",
			};

			Object.entries(audioEndpoints).forEach(async ([key, endpoint]) => {
				try {
					const formData = new FormData();
					formData.append("file", audioFile);

					const res = await api.post(endpoint, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
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
			});

			let trans = "Nothing Found";
			try {
				const transcriptionRespone = await transcriptionPromise;
				trans = transcriptionRespone.data["transcript"];

				console.log("transcription");
				console.log(transcriptionRespone.data);

				setSectionData((prev) => ({
					...prev,
					transcription: {
						loading: false,
						content: transcriptionRespone.data,
					},
				}));
			} catch (err) {
				setSectionData((prev) => ({
					...prev,
					transcription: {
						loading: false,
						content: `Error: ${(err as Error).message}`,
					},
				}));
			}

			//initiate awaited calls
			const transcriptionEndpoints = {
				summary: "api/audio/summary",
				tone: "api/audio/tone",
				topic: "api/audio/topic",
				entity: "api/audio/entity",
			};

			Object.entries(transcriptionEndpoints).forEach(
				async ([key, endpoint]) => {
					try {
						const res = await api.post(endpoint, {
							text: trans,
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

			const lastEndpoint = {
				clarity: "api/audio/clarity-score",
			};

			Object.entries(lastEndpoint).forEach(async ([key, endpoint]) => {
				try {
					const formData = new FormData();
					formData.append("file", audioFile);
					formData.append("text", trans);

					const res = await api.post(endpoint, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
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
			});
		} catch (e) {
			toast.error((e as Error).message);
		}
	};

	const handleGetSample = async () => {
		try {
			const res = await api.get(
				`/api/audio/get-sample?cacheBust=${Date.now()}`,
				{ responseType: "blob" }
			);

			const file = new File([res.data], "sample-audio.mp3", {
				type: res.data.type,
			});

			setAudioFile(file);
			setAudioPreview(URL.createObjectURL(file));
		} catch (e) {
			toast.error((e as Error).message);
		}
	};

	return (
		<div className="flex flex-col items-center w-full">
			<motion.h1
				initial={false}
				animate={{ marginTop: !move ? "8rem" : 0 }}
				exit={{ marginTop: 0 }}
				transition={{ duration: 0.5 }}
				onAnimationComplete={() => {
					setMoved(true);
				}}
				className={`relative select-none font-bold tracking-wide text-2xl dark:text-foreground text-neutral-700 mb-5 mt-40 ${
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
				Audio Analysis
			</motion.h1>

			<motion.div
				layout
				onDrop={onDrop}
				onDragOver={onDragOver}
				onClick={() => inputRef.current?.click()}
				className={`${
					!audioPreview
						? "border-2 border-dashed border-neutral-400 dark:border-neutral-600"
						: ""
				} rounded-md w-full max-w-xl min-h-30 h-48 flex flex-col justify-center items-center ${
					!analyzing ? "cursor-pointer" : ""
				} relative`}
			>
				<AnimatePresence>
					{!audioPreview ? (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: audioPreview ? 0 : 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="text-center text-neutral-500 dark:text-neutral-400"
						>
							Drag and drop an audio here, or click to upload
						</motion.p>
					) : (
						<motion.audio
							initial={{ opacity: 0 }}
							animate={{ opacity: !audioPreview ? 0 : 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							controls
							src={audioPreview}
							className="w-full max-w-md"
						/>
					)}
				</AnimatePresence>

				<input
					ref={inputRef}
					type="file"
					accept="audio/*"
					className="hidden"
					onChange={onFileChange}
					disabled={analyzing}
				/>
			</motion.div>

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
						className="mt-4 sm:w-2/3 w-full max-w-xl flex justify-between flex-col-reverse md:flex-row"
					>
						<Button
							onClick={handleGetSample}
							variant={"link"}
							className="text-xs cursor-pointer"
						>
							Click here to use sample text
						</Button>
						<div className="w-full md:w-5/11 flex md:flex-row flex-row-reverse justify-between md:justify-end px-10 md:px-2 gap-2 mb-3 md:mb-0">
							<Button
								onClick={handleAnalyzePress}
								className="bg-neutral-600 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-600 rounded-3xl h-8 w-25 cursor-pointer text-xs"
							>
								Analyze Audio
							</Button>
							<Button
								onClick={clearAudio}
								disabled={!audioFile}
								className="bg-neutral-600 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-600 rounded-3xl h-8 w-25 cursor-pointer text-xs"
							>
								Clear
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* separator */}
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

			{/* accordians */}
			<AnimatePresence>
				{moved && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="w-full sm:w-2/3 mt-5"
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

									const additionalProps =
										key === "object"
											? { audioPreview }
											: {};

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
													{...additionalProps}
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

export default AudioPage;
