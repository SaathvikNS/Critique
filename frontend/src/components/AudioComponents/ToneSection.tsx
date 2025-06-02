import type { ToneSectionType } from "@/utils/AudioTypes";

const ToneSection = ({ content }: { content: ToneSectionType }) => {
	return (
		<div>
			{content.tone[0]}
			<div className="mt-5">
				<p className="text-muted-foreground text-xs">
					Few key emotions include:{" "}
				</p>
				<div className="mt-2 grid w-full gap-1 [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]">
					{content.tone[1].map((item, index) => (
						<span key={index}>{item}</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default ToneSection;
