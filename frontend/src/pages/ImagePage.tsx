import {
	Accordion,
	AccordionContent,
	AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { useThemeStore } from "@/store/themeStore";
import CustomAccordionTrigger from "@/components/CustomAccordionTrigger";
import api from "@/components/api";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import TextSection from "@/components/ImageComponents/TextSection";
import ObjectSection from "@/components/ImageComponents/ObjectSection";
import QualitySection from "@/components/ImageComponents/QualitySection";
import AestheticSection from "@/components/ImageComponents/AestheticSection";
import EmotionSection from "@/components/ImageComponents/EmotionSection";
import type {
	AestheticSectionType,
	EmotionSectionType,
	ObjectSectionType,
	QualitySectionType,
	SectionKey,
	TextSectionType,
} from "@/utils/SectionTypes";
// import { RotateCw } from "lucide-react";
// import {
// 	Tooltip,
// 	TooltipContent,
// 	TooltipTrigger,
// } from "@/components/ui/tooltip";

const ImagePage = () => {
	const { theme } = useThemeStore();

	const [move, setMove] = useState<boolean>(false);
	const [moved, setMoved] = useState<boolean>(false);

	const [analyzing, setAnalyzing] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const sections = [
		{ key: "text", title: "Text Extraction" },
		{ key: "object", title: "Object Detection" },
		{ key: "quality", title: "Quality Assessment" },
		{ key: "aesthetics", title: "Aesthetics Evaluation" },
		{ key: "emotion", title: "Emotion Detection" },
	];

	const [sectionData, setSectionData] = useState(
		Object.fromEntries(
			sections.map((s) => [s.key, { loading: false, content: "" }])
		)
	);

	const sectionComponents: {
		text: React.FC<{ content: TextSectionType }>;
		object: React.FC<{ content: ObjectSectionType }>;
		quality: React.FC<{ content: QualitySectionType }>;
		aesthetics: React.FC<{ content: AestheticSectionType }>;
		emotion: React.FC<{ content: EmotionSectionType }>;
	} = {
		text: TextSection,
		object: ObjectSection,
		quality: QualitySection,
		aesthetics: AestheticSection,
		emotion: EmotionSection,
	};

	const inputRef = useRef<HTMLInputElement | null>(null);

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		} else {
			toast.error("Please select a valid image file.");
		}
	};

	const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("image/")) {
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		} else {
			toast.error("Please drop a valid image file.");
		}
	}, []);

	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const clearImage = () => {
		setImageFile(null);
		setImagePreview(null);
	};

	const handleAnalyzePress = async () => {
		if (!imageFile) {
			toast.info("Please upload or drop an image first");
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

			const endpoints = {
				text: "api/image/extract-text",
				object: "api/image/object-detection",
				quality: "api/image/image-quality",
				aesthetics: "api/image/aesthetic-evaluation",
				emotion: "api/image/emotion-detection",
			};

			Object.entries(endpoints).forEach(async ([key, endpoint]) => {
				try {
					const formData = new FormData();
					formData.append("file", imageFile);

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
		} catch (err) {
			toast.error((err as Error).message);
		}
	};

	const handleGetSample = async () => {
		try {
			const res = await api.get(
				`/api/image/get-sample?cacheBust=${Date.now()}`,
				{
					responseType: "blob",
				}
			);

			const file = new File([res.data], "sample-image.jpg", {
				type: res.data.type,
			});

			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		} catch (e) {
			toast.error((e as Error).message);
		}
	};

	return (
		<div className="flex flex-col items-center h-full">
			<motion.h1
				initial={false}
				animate={{ marginTop: !move ? "8rem" : 0 }}
				exit={{ marginTop: "1rem" }}
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
				Image Analysis
			</motion.h1>

			<motion.div
				layout
				onDrop={onDrop}
				onDragOver={onDragOver}
				onClick={() => inputRef.current?.click()}
				className={`${
					!imagePreview
						? "border-2 border-dashed border-neutral-400 dark:border-neutral-600"
						: ""
				} rounded-md w-full max-w-xl min-h-30 h-48 flex flex-col justify-center items-center ${
					!analyzing ? "cursor-pointer" : ""
				} relative`}
			>
				<AnimatePresence>
					{!imagePreview ? (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: imagePreview ? 0 : 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="text-center text-neutral-500 dark:text-neutral-400"
						>
							Drag and drop an image here, or click to upload
						</motion.p>
					) : (
						<motion.img
							initial={{ opacity: 0 }}
							animate={{ opacity: !imagePreview ? 0 : 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							src={imagePreview}
							alt="Uploaded preview"
							className="max-h-full max-w-full object-contain rounded-md"
						/>
					)}
				</AnimatePresence>
				<input
					ref={inputRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={onFileChange}
					disabled={analyzing}
				/>
			</motion.div>

			{/* buttons */}
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
								Analyze Image
							</Button>
							<Button
								onClick={clearImage}
								disabled={!imageFile}
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
											? { imagePreview }
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

export default ImagePage;
