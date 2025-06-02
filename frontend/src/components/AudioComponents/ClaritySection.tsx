import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ClaritySectionType } from "@/utils/AudioTypes";

const ClaritySection = ({ content }: { content: ClaritySectionType }) => {
	const metrics = [
		{ label: "Clarity Score", value: content["Clarity Score"] },
		{ label: "Words Per Minute", value: content.WPM },
		{ label: "Filler Score", value: content["Filler Score"] },
		{ label: "Silence Score", value: content["Silence Score"] },
		{ label: "Volume Score", value: content["Volume Score"] },
		{ label: "Noise Score", value: content["Noise Score"] },
	];

	return (
		<Card className="w-full bg-transparent border-0 shadow-none">
			<CardContent className="space-y-4">
				{metrics.map((metric) => (
					<div key={metric.label} className="space-y-1">
						<div className="flex justify-between text-sm font-medium">
							<span>{metric.label}</span>
							<span>{metric.value.toFixed(2)}</span>
						</div>
						{metric.label !== "WPM" && (
							<Progress value={metric.value} />
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default ClaritySection;
