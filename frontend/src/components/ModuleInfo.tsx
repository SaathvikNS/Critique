import { useThemeStore } from "@/store/themeStore";
import { ScrollArea } from "./ui/scroll-area";

const ModuleInfo = () => {
	const { tab } = useThemeStore();

	const modules = {
		text: [
			"Grammar and spelling correction",
			"Readability analysis",
			"Tone analysis",
			"Keyword extraction",
			"Word frequency",
			"Key-phrase extraction",
			"Topic Detection",
			"Entity Recognition",
			"Basic Summarization",
		],
		image: [
			"Object detection",
			"Caption generation",
			"Image Quality Assessment",
			"Color aesthetics",
			"Composition",
			"Palette psycology",
			"Emotion Detection",
			"Text extraction",
		],
		audio: [
			"Audio Transcription",
			"Summary",
			"Tone Analysis",
			"Topic Detection",
			"Entity Recognition",
			"Clarity Score",
			"Musical Entities",
		],
	};

	return (
		<ScrollArea className="mt-4 h-full text-neutral-400">
			{tab === "text" ? (
				<ul>
					{modules["text"].map((item, key) => (
						<li key={key}>{item}</li>
					))}
				</ul>
			) : tab === "image" ? (
				<ul>
					{modules["image"].map((item, key) => (
						<li key={key}>{item}</li>
					))}
				</ul>
			) : tab === "audio" ? (
				<ul>
					{modules["audio"].map((item, key) => (
						<li key={key}>{item}</li>
					))}
				</ul>
			) : null}
		</ScrollArea>
	);
};

export default ModuleInfo;
