import { Card, CardContent } from "@/components/ui/card";
import type { MusicalSectionType } from "@/utils/AudioTypes";

const MusicalSection = ({ content }: { content: MusicalSectionType }) => {
	const metrics = [
		{ label: "Tempo (BPM)", value: content["Tempo (BPM)"].toFixed(2) },
		{ label: "Estimated Key", value: content["Estimated Key"] },
		{
			label: "Pitch Mean (Hz)",
			value: content["Pitch Mean (Hz)"].toFixed(2),
		},
		{ label: "Pitch Std Dev", value: content["Pitch Std Dev"].toFixed(2) },
		{
			label: "Rhythmic Strength",
			value: content["Rhythmic Strength"].toFixed(4),
		},
	];

	return (
		<Card className="w-full border-0 bg-transparent shadow-none">
			<CardContent className="space-y-4">
				{metrics.map((metric) => (
					<div
						key={metric.label}
						className="flex justify-between text-sm font-medium"
					>
						<span>{metric.label}</span>
						<span>{metric.value}</span>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default MusicalSection;
