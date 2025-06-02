import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import type { EmotionSectionType } from "@/utils/SectionTypes";

const EmotionSection = ({ content }: { content: EmotionSectionType }) => {
	if (!content.color_emotion) {
		return (
			<p className="text-muted-foreground">
				No emotions recognized in the given image.
			</p>
		);
	}

	return (
		<ScrollArea className="w-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className=" text-center">Emotion</TableHead>
						<TableHead className=" text-center">Type</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.entries(content.color_emotion).map(
						([emotion, confidence], index) => (
							<TableRow key={index}>
								<TableCell className="w-[50%] px-4">
									{emotion}
								</TableCell>
								<TableCell className="w-[50%] px-4">
									{confidence}
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};

export default EmotionSection;
