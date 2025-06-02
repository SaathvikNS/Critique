import type { AestheticSectionType } from "../../utils/SectionTypes";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const AestheticSection = ({ content }: { content: AestheticSectionType }) => {
	return (
		<div>
			<div>
				<div className="mb-5">
					<span className="font-semibold self-center">
						Composition
					</span>{" "}
					- {content.composition}
				</div>
				<div className="mb-5">
					<span className="font-semibold self-center">Balance</span> -{" "}
					{content.balance}
				</div>
			</div>
			<div className="flex gap-4 items-center">
				<Badge className="w-[100px] !text-wrap text-center md:w-[150px] h-10 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
					Visual Appeal{" "}
					{content.visual_appeal.visual_appeal_score.toFixed(2)}
				</Badge>
				<span>{content.visual_appeal.remark}</span>
			</div>

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			<div>
				<div className="font-semibold self-center">
					Color Aesthetics
				</div>
				<div className="mt-5 grid w-full gap-2">
					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Harmony
						</Badge>
						<span>{content.color_aesthetics["harmony"]}</span>
					</div>
				</div>
				<div className="mt-5 grid w-full gap-2">
					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Warmth
						</Badge>
						<span>{content.color_aesthetics["warmth"]}</span>
					</div>
				</div>
				<div className="mt-5 grid w-full gap-2">
					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Variety
						</Badge>
						<span>{content.color_aesthetics["variety"]}</span>
					</div>
				</div>
			</div>

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			<div className="text-muted-foreground">
				{content.palette_psycology}
			</div>

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			<div>
				<div className="font-semibold self-center">Leading Lines</div>
				<Badge className="mt-5 rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
					Leading lines detected -{" "}
					{content.leading_lines.leading_lines_detected}
				</Badge>
				<div className="text-muted-foreground mt-2">
					{content.leading_lines.description}
				</div>
				{content.leading_lines.leading_lines_detected != 0 && (
					<img
						src={`data:image/jpeg;base64,${content.leading_lines.visualization_base64}`}
						className="mt-4 w-full"
					/>
				)}
			</div>

			<div className="my-5">
				<Separator className="bg-border" />
			</div>

			<div>
				<div className="font-semibold self-center">
					Other Aesthetic Metrics
				</div>
				<div className="mt-5 w-full gap-2 mx-auto">
					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Texture Consistency
						</Badge>
						<span>{content.texture_consistency["verdict"]}</span>
					</div>
				</div>
				<div className="mt-5 w-full gap-2 mx-auto">
					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Negative Space Ratio
						</Badge>
						<span>{content.negative_space_ratio["verdict"]}</span>
					</div>
				</div>
				<div className="mt-5 w-full gap-2 mx-auto">
					<div className="flex gap-4 items-center">
						<Badge className="w-[100px] !text-wrap text-center md:w-[150px] rounded-2xl bg-[#e7e0eb] dark:bg-[#dbe2ea] dark:text-background text-neutral-600 select-none">
							Focal Point
						</Badge>
						<span>{content.focal_point["verdict"]}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AestheticSection;
