import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import type { TopicContentType } from "@/utils/TextContentTypes";

const TopicSection = ({ content }: { content: TopicContentType }) => {
	const entries = Object.entries(content).map(([key, value]) => ({
		name: key,
		value,
	}));

	const itemsPerPage = 10;
	const columnWidth = 250;
	const tableContainerRef = useRef<HTMLDivElement>(null);
	const [columnsPerPage, setColumnsPerPage] = useState(1);

	const [columnSetIndex, setColumnSetIndex] = useState(0);

	useEffect(() => {
		const updateColumns = () => {
			if (!tableContainerRef.current) return;
			const containerWidth = tableContainerRef.current.offsetWidth;
			const possibleColumns = Math.max(
				1,
				Math.floor(containerWidth / columnWidth)
			);
			setColumnsPerPage(possibleColumns);
		};

		updateColumns();

		const container = tableContainerRef.current;
		const observer = new ResizeObserver(updateColumns);
		if (tableContainerRef.current) {
			observer.observe(tableContainerRef.current);
		}

		return () => {
			if (container) {
				observer.unobserve(container);
			}
		};
	}, []);

	const totalPages = Math.ceil(entries.length / itemsPerPage);
	const totalColumnSets = Math.ceil(totalPages / columnsPerPage);

	const startPage = columnSetIndex * columnsPerPage;
	const endPage = Math.min(startPage + columnsPerPage, totalPages);

	const pagedData: { name: string; value: number }[][] = [];
	for (let page = startPage; page < endPage; page++) {
		const start = page * itemsPerPage;
		const end = start + itemsPerPage;
		pagedData.push(entries.slice(start, end));
	}
	const maxRows = Math.max(...pagedData.map((col) => col.length));

	return (
		<div className="space-y-5">
			<div ref={tableContainerRef} className="w-full overflow-x-auto">
				<Table className="min-w-full w-max">
					<TableHeader>
						<TableRow>
							{pagedData.map((_, colIndex) => (
								<>
									<TableHead
										key={`head-topic-${colIndex}`}
										className={
											colIndex % 2 !== 0
												? "bg-gray-100 dark:bg-neutral-900"
												: "bg-gray-200 dark:bg-neutral-800"
										}
									>
										Topic
									</TableHead>
									<TableHead
										key={`head-confidence-${colIndex}`}
										className={
											colIndex % 2 !== 0
												? "bg-gray-100 dark:bg-neutral-900"
												: " bg-gray-200 dark:bg-neutral-800"
										}
									>
										Confidence
									</TableHead>
								</>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: maxRows }).map((_, rowIndex) => (
							<TableRow key={rowIndex}>
								{pagedData.map((column, colIndex) => {
									const item = column[rowIndex];
									const bgClass =
										colIndex % 2 !== 0
											? "bg-[#fff] py-1.5 dark:bg-[#2b2b2b]"
											: "bg-[#f8f1fc] py-1.5 dark:bg-[#333333]";
									if (item) {
										return (
											<>
												<TableCell
													key={`name-${colIndex}-${rowIndex}`}
													className={bgClass}
												>
													{item.name}
												</TableCell>
												<TableCell
													key={`val-${colIndex}-${rowIndex}`}
													className={bgClass}
												>
													{(item.value * 100).toFixed(
														2
													)}{" "}
													%
												</TableCell>
											</>
										);
									} else {
										return (
											<>
												<TableCell
													key={`name-empty-${colIndex}-${rowIndex}`}
													className={bgClass}
												/>
												<TableCell
													key={`val-empty-${colIndex}-${rowIndex}`}
													className={bgClass}
												/>
											</>
										);
									}
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex justify-center items-center gap-5 text-xs">
				<Button
					variant="outline"
					disabled={columnSetIndex === 0}
					onClick={() => setColumnSetIndex((i) => i - 1)}
					className="h-8"
				>
					<ChevronLeft className="w-4 h-4" />
				</Button>
				<span>
					Showing pages {startPage + 1}–{endPage} of {totalPages}
				</span>
				<Button
					variant="outline"
					disabled={columnSetIndex >= totalColumnSets - 1}
					onClick={() => setColumnSetIndex((i) => i + 1)}
					className="h-8"
				>
					<ChevronRight className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};

export default TopicSection;
