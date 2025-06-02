import { useEffect, useState } from "react";
import type { ObjectSectionType } from "../../utils/SectionTypes";
import ImageWithBoxes from "../ImageWithBoxes";
import { Separator } from "../ui/separator";
import { AnimatePresence, motion } from "framer-motion";

const ObjectSection = ({
	content,
	imagePreview,
}: {
	content: ObjectSectionType;
	imagePreview: string;
}) => {
	const [showObjects, setShowObjects] = useState<boolean>(false);
	const [showObjectsCount, setShowObjectsCount] = useState<boolean>(false);
	const [showObjectsCategory, setShowObjectsCategory] =
		useState<boolean>(false);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (!imagePreview) return;

		const img = new Image();
		img.src = imagePreview;

		img.onload = () => {
			setDimensions({
				width: img.naturalWidth,
				height: img.naturalHeight,
			});
		};
	}, [imagePreview]);

	const totalCoveredArea = content.detections.reduce(
		(sum, { box, confidence }) => {
			const [x1, y1, x2, y2] = box;
			const width = x2 - x1;
			const height = y2 - y1;
			return sum + width * height * confidence;
		},
		0
	);

	const imageArea = dimensions.width * dimensions.height;
	const coverage = (totalCoveredArea / imageArea) * 100;

	return (
		<div>
			<div className="text-lg font-bold">
				{content.caption.charAt(0).toUpperCase() +
					content.caption.slice(1) +
					" ."}
			</div>

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			<div>
				<strong>Objects Detected</strong>
				<div className="w-full max-w-full my-5">
					<ImageWithBoxes
						detections={content.detections}
						imagePreview={imagePreview}
					/>
				</div>
				<div className="my-5 font-semibold">
					{coverage > 50 ? (
						<p>
							Too much of the image is taken up by detected
							objects — they cover {coverage.toFixed(2)}% of it.
						</p>
					) : (
						<p>
							The balance looks good! Detected objects cover just{" "}
							{coverage.toFixed(2)}% of the image.
						</p>
					)}
				</div>
				<div className="w-full">
					<div className="flex items-end gap-2">
						<div className="font-semibold">Objects Detected</div>
						<button
							className="text-xs cursor-pointer text-blue-500 hover:underline"
							onClick={() => setShowObjects(!showObjects)}
						>
							{showObjects ? "(Hide)" : "(Show)"}
						</button>
					</div>

					{content.detections.length > 0 ? (
						<AnimatePresence mode="wait">
							{showObjects && (
								<motion.ul
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3 }}
									className="list-disc px-3 pt-3 mt-2 grid w-full gap-y-1 gap-x-5 [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))]"
								>
									{content.detections.map(
										(detection, index) => (
											<li
												key={index}
												className="flex justify-between max-w-[100px]"
											>
												<span>{detection.label}</span>
												<span>
													{detection.confidence}
												</span>
											</li>
										)
									)}
								</motion.ul>
							)}
						</AnimatePresence>
					) : (
						<AnimatePresence mode="wait">
							{showObjects && (
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

			<div className="w-full">
				<div className="flex items-end gap-2">
					<div className="font-semibold">Count Of Objects</div>
					<button
						className="text-xs cursor-pointer text-blue-500 hover:underline"
						onClick={() => setShowObjectsCount(!showObjectsCount)}
					>
						{showObjectsCount ? "(Hide)" : "(Show)"}
					</button>
				</div>

				{content.object_counts ? (
					<AnimatePresence mode="wait">
						{showObjectsCount && (
							<motion.ul
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className="list-disc px-3 pt-3 mt-2 grid w-full gap-y-1 gap-x-5 [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))]"
							>
								{Object.entries(content.object_counts).map(
									([label, count], index) => (
										<li
											key={index}
											className="flex justify-between max-w-[100px]"
										>
											<span>{label}</span>
											<span>{count}</span>
										</li>
									)
								)}
							</motion.ul>
						)}
					</AnimatePresence>
				) : (
					<AnimatePresence mode="wait">
						{showObjectsCount && (
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

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			<div className="w-full">
				<div className="flex items-end gap-2">
					<div className="font-semibold">Categories of Objects</div>
					<button
						className="text-xs cursor-pointer text-blue-500 hover:underline"
						onClick={() =>
							setShowObjectsCategory(!showObjectsCategory)
						}
					>
						{showObjectsCategory ? "(Hide)" : "(Show)"}
					</button>
				</div>

				{content.category_tag.length > 0 ? (
					<AnimatePresence mode="wait">
						{showObjectsCategory && (
							<motion.ul
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className="list-disc px-3 pt-3 mt-2 grid w-full gap-y-1 gap-x-5 [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))]"
							>
								{content.category_tag.map((item, index) => (
									<li
										key={index}
										className="flex justify-between max-w-[100px]"
									>
										<span>{item[0]}</span>
										<span>{item[1]}</span>
									</li>
								))}
							</motion.ul>
						)}
					</AnimatePresence>
				) : (
					<AnimatePresence mode="wait">
						{showObjectsCategory && (
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

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			<div className="w-full">
				<div className="flex items-end gap-2">
					<div className="flex items-end gap-2">
						<div className="">Salient Object</div>
						<span className="text-xs">
							(object that stands out the most)
						</span>
					</div>
					<span>-</span>
					<p className="font-bold">
						{content.salient_object.charAt(0).toUpperCase() +
							content.salient_object.slice(1)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ObjectSection;
