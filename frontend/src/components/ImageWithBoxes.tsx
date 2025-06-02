import type { DetectionType } from "@/utils/SectionTypes";
import { useEffect, useRef } from "react";

const ImageWithBoxes = ({
	detections,
	imagePreview,
}: {
	detections: DetectionType[];
	imagePreview: string;
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const imageRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const image = imageRef.current;

		if (!canvas || !image) return;

		const draw = () => {
			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			const renderedWidth = image.clientWidth;
			const renderedHeight = image.clientHeight;
			const naturalWidth = image.naturalWidth;
			const naturalHeight = image.naturalHeight;

			const scaleX = renderedWidth / naturalWidth;
			const scaleY = renderedHeight / naturalHeight;

			canvas.width = renderedWidth;
			canvas.height = renderedHeight;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(image, 0, 0, renderedWidth, renderedHeight);

			detections.forEach((det) => {
				const [x1, y1, x2, y2] = det.box;
				const adjX1 = x1 * scaleX;
				const adjY1 = y1 * scaleY;
				const adjWidth = (x2 - x1) * scaleX;
				const adjHeight = (y2 - y1) * scaleY;

				ctx.strokeStyle = "#00ff00";
				ctx.lineWidth = 2;
				ctx.strokeRect(adjX1, adjY1, adjWidth, adjHeight);

				ctx.font = "10px Arial";
				ctx.fillStyle = "#00ff00";
				ctx.fillText(
					`${det.label} (${(det.confidence * 100).toFixed(1)}%)`,
					adjX1,
					adjY1 - 5
				);
			});
		};

		if (image.complete) {
			draw();
		} else {
			image.onload = draw;
		}
	}, [detections, imagePreview]);

	return (
		<div className="relative w-full max-w-3xl mx-auto">
			<img
				ref={imageRef}
				src={imagePreview}
				alt="Detection"
				className="w-full h-auto max-h-[80vh] object-contain"
			/>
			<canvas
				ref={canvasRef}
				className="absolute top-0 left-0 pointer-events-none"
			/>
		</div>
	);
};

export default ImageWithBoxes;
