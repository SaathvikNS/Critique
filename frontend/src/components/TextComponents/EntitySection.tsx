import type { EntityContentType } from "@/utils/TextContentTypes";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

const EntitySection = ({ content }: { content: EntityContentType }) => {
	if (content.length === 0) {
		return (
			<p className="text-muted-foreground">
				No entity recognized in the given text.
			</p>
		);
	}

	return (
		<ScrollArea className="w-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className=" text-center">Entity</TableHead>
						<TableHead className=" text-center">Type</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{content.map(([name, type], index) => (
						<TableRow key={index}>
							<TableCell className="w-[50%] px-4">
								{name}
							</TableCell>
							<TableCell className="w-[50%] px-4">
								{type}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};

export default EntitySection;
