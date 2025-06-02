import type { QualitySectionType } from "../../utils/SectionTypes";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const QualitySection = ({ content }: { content: QualitySectionType }) => {
	const under = content.exposure["underexposed_pct"];
	const over = content.exposure["overexposed_pct"];

	const expdiff = under - over;
	const expthreshold = 0.04 * (under + over);

	function getBrightness(hex: string) {
		hex = hex.replace("#", "");

		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);

		return (r * 299 + g * 587 + b * 114) / 1000;
	}

	function rgbToHex(rgb: Array<number>) {
		return (
			"#" +
			rgb
				.map((x) => {
					const hex = x.toString(16);
					return hex.length === 1 ? "0" + hex : hex;
				})
				.join("")
		);
	}

	const hexcolors = content.dominant_colors.map(rgbToHex);

	return (
		<div>
			{" "}
			<div className="flex flex-col">
				<div className="font-semibold self-center">Quality Metrics</div>
				<div className="mt-5 grid w-full gap-2">
					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] h-10 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Sharpness {content.sharpness.toFixed(2)}
						</Badge>
						<span>
							{content.sharpness < 50
								? "The image is quite blurry, making it hard to distinguish details clearly."
								: content.sharpness < 150
								? "The image is slightly soft, showing some clarity but still lacking sharpness."
								: content.sharpness < 500
								? "The image quality is good, with clear and visible details."
								: "The image is sharp and crisp, showing excellent detail and clarity."}
						</span>
					</div>

					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] h-10 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Brightness {content.brightness.toFixed(2)}
						</Badge>
						<span>
							{content.brightness < 100
								? "The image is too dark, making details hard to see."
								: content.brightness < 120
								? "The brightness is ideal but a bit on the darker side."
								: content.brightness < 160
								? "The brightness is just right, perfect for clear viewing."
								: content.brightness < 180
								? "The brightness is ideal but slightly brighter than optimal."
								: "The image is too bright, causing loss of detail in highlights."}
						</span>
					</div>

					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] h-10 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Exposure{" "}
							{expdiff > expthreshold
								? "-" + under
								: expdiff < -expthreshold
								? "+" + over
								: "Normal"}
						</Badge>
						<span>
							{expdiff > expthreshold
								? "The image is mostly underexposed, meaning it's too dark overall."
								: expdiff < -expthreshold
								? "The image is mostly overexposed, meaning it's too bright overall."
								: "The exposure is balanced with no extreme dark or bright areas."}
						</span>
					</div>

					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] h-10 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Contrast - {content.contrast.toFixed(2)}
						</Badge>
						<span>
							{content.contrast < 20
								? "Contrast is low, so the image may look flat or dull."
								: content.contrast < 50
								? "Moderate contrast provides some depth but could be improved."
								: "High contrast - the image has good clarity and distinction."}
						</span>
					</div>

					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] h-10 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Noise - {content.noise.toFixed(2)}
						</Badge>
						<span>
							{content.noise < 1.0
								? "Low noise - your image is clean and clear."
								: "Higher noise detected - some graininess might be present."}
						</span>
					</div>

					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] h-10 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Saturation - {content.brightness.toFixed(2)}
						</Badge>
						<span>
							{content.saturation < 50
								? "Muted or flat colors - the image feels a bit dull."
								: content.saturation < 150
								? "Normal saturation - colors look natural and balanced."
								: "Oversaturated - colors might be too intense or unnatural."}
						</span>
					</div>

					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] h-10 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Dynamic Range - {content.brightness.toFixed(2)}
						</Badge>
						<span>
							{content.dynamic_range <= 30
								? "Flat / Low Dynamic Range - the image lacks depth and contrast."
								: content.dynamic_range <= 100
								? "Low Dynamic Range - some contrast but still limited tonal variation."
								: content.dynamic_range <= 180
								? "Moderate Dynamic Range - good balance with decent contrast."
								: content.dynamic_range <= 230
								? "High Dynamic Range - rich contrast and vivid details."
								: "Very High Dynamic Range - exceptional depth and tonal range."}
						</span>
					</div>

					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] h-10 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Localized Blur - {content.brightness.toFixed(2)}
						</Badge>
						<span>
							{content.localized_blur >= 0 &&
							content.localized_blur <= 10
								? "Very sharp - details are crisp and clear."
								: content.localized_blur <= 25
								? "Mostly sharp - image is clear with minor softness."
								: content.localized_blur <= 50
								? "Moderately sharp - some blurriness noticeable."
								: content.localized_blur <= 75
								? "Blurry - details are quite soft and unclear."
								: content.localized_blur <= 100
								? "Very blurry - image lacks clarity and definition."
								: "Invalid score"}
						</span>
					</div>
				</div>

				<div className="my-5">
					<Separator className="bg-border" />
				</div>

				<div className="flex flex-col">
					<div className="font-semibold self-center">
						Dominant Colors
					</div>
					<div className="mt-5 grid w-full gap-2 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
						{hexcolors.map((color, index) => {
							const brightness = getBrightness(color);
							const textcolor =
								brightness < 128 ? "#fff" : "#000";

							return (
								<Badge
									key={index}
									style={{
										backgroundColor: color,
										color: textcolor,
									}}
									className={`w-full dark:text-background border-1 border-muted-foreground text-neutral-600 select-none`}
								>
									{color}
								</Badge>
							);
						})}
					</div>
				</div>

				<div className="my-5">
					<Separator className="bg-border" />
				</div>

				<div>
					<div>
						{content.white_balance_deviation &&
						content.white_balance_deviation.R_deviation >= 0 &&
						content.white_balance_deviation.G_deviation >= 0 &&
						content.white_balance_deviation.B_deviation >= 0 ? (
							content.white_balance_deviation.R_deviation -
								content.white_balance_deviation.G_deviation >
								15 &&
							content.white_balance_deviation.B_deviation -
								content.white_balance_deviation.G_deviation >
								15 ? (
								<div className="flex flex-col gap-1">
									<div className="flex gap-4">
										<div className="font-semibold self-center">
											White Balance Deviation
										</div>
										<Badge className="bg-pink-500 text-white w-fit">
											Pink/Magenta Color Cast
										</Badge>
									</div>
									<span className="text-sm text-muted-foreground">
										Red and blue tones are significantly
										stronger than green.
									</span>
								</div>
							) : content.white_balance_deviation.R_deviation -
									content.white_balance_deviation
										.B_deviation >
									15 &&
							  content.white_balance_deviation.G_deviation -
									content.white_balance_deviation
										.B_deviation >
									15 ? (
								<div className="flex flex-col gap-1">
									<div className="flex gap-4">
										<div className="font-semibold self-center">
											White Balance Deviation
										</div>
										<Badge className="bg-yellow-400 text-black w-fit">
											Yellow Color Cast
										</Badge>
									</div>
									<span className="text-sm text-muted-foreground">
										Red and green tones are dominant over
										blue.
									</span>
								</div>
							) : content.white_balance_deviation.G_deviation -
									content.white_balance_deviation
										.R_deviation >
									15 &&
							  content.white_balance_deviation.B_deviation -
									content.white_balance_deviation
										.R_deviation >
									15 ? (
								<div className="flex flex-col gap-1">
									<div className="flex gap-4">
										<div className="font-semibold self-center">
											White Balance Deviation
										</div>
										<Badge className="bg-cyan-400 text-black w-fit">
											Cyan Color Cast
										</Badge>
									</div>
									<span className="text-sm text-muted-foreground">
										Green and blue tones are stronger than
										red.
									</span>
								</div>
							) : content.white_balance_deviation.R_deviation >
									content.white_balance_deviation
										.G_deviation &&
							  content.white_balance_deviation.R_deviation >
									content.white_balance_deviation
										.B_deviation ? (
								<div className="flex flex-col gap-1">
									<div className="flex gap-4">
										<div className="font-semibold self-center">
											White Balance Deviation
										</div>
										<Badge className="bg-red-500 text-white w-fit">
											Red Color Cast
										</Badge>
									</div>
									<span className="text-sm text-muted-foreground">
										Red deviation is significantly higher
										than other channels.
									</span>
								</div>
							) : content.white_balance_deviation.G_deviation >
									content.white_balance_deviation
										.R_deviation &&
							  content.white_balance_deviation.G_deviation >
									content.white_balance_deviation
										.B_deviation ? (
								<div className="flex flex-col gap-1">
									<div className="flex gap-4">
										<div className="font-semibold self-center">
											White Balance Deviation
										</div>
										<Badge className="bg-green-500 text-white w-fit">
											Green Color Cast
										</Badge>
									</div>
									<span className="text-sm text-muted-foreground">
										Green deviation is significantly higher
										than other channels.
									</span>
								</div>
							) : content.white_balance_deviation.B_deviation >
									content.white_balance_deviation
										.R_deviation &&
							  content.white_balance_deviation.B_deviation >
									content.white_balance_deviation
										.G_deviation ? (
								<div className="flex flex-col gap-1">
									<div className="flex gap-4">
										<div className="font-semibold self-center">
											White Balance Deviation
										</div>
										<Badge className="bg-blue-500 text-white w-fit">
											Blue Color Cast
										</Badge>
									</div>
									<span className="text-sm text-muted-foreground">
										Blue deviation is significantly higher
										than other channels.
									</span>
								</div>
							) : (
								<div className="flex flex-col gap-1">
									<div className="flex gap-4">
										<div className="font-semibold self-center">
											White Balance Deviation
										</div>
										<Badge className="bg-neutral-400 text-black w-fit">
											Neutral White Balance
										</Badge>
									</div>
									<span className="text-sm text-muted-foreground">
										No dominant color deviation detected.
									</span>
								</div>
							)
						) : (
							<div className="text-muted-foreground">
								Invalid white balance deviation values.
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default QualitySection;
