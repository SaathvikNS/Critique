import type { TranscriptionSectionType } from "@/utils/AudioTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TranscriptionSection = ({
	content,
}: {
	content: TranscriptionSectionType;
}) => {
	const durationMinutes = Math.floor(content.duration_seconds / 60);
	const durationSeconds = content.duration_seconds % 60;

	return (
		<Card className="w-full bg-transparent border-0 shadow-none">
			<CardContent className="space-y-2">
				<div>
					<p className="text-muted-foreground text-sm mb-1">
						Transcript:
					</p>
					<div className="p-3 text-sm max-h-64 overflow-y-auto whitespace-pre-wrap">
						{content.transcript}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<p className="text-muted-foreground">Language</p>
						<p className="font-medium">
							{content.language.toUpperCase()}
						</p>
					</div>
					<div>
						<p className="text-muted-foreground">Duration</p>
						<p className="font-medium">
							{durationMinutes > 0 && (
								<span>{durationMinutes} m</span>
							)}{" "}
							{durationSeconds}s
						</p>
					</div>
				</div>

				<div>
					<p className="text-muted-foreground text-sm mb-1">
						Confidence ({content.average_confidence_percent}%)
					</p>
					<Progress
						value={content.average_confidence_percent}
						className="mt-2"
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default TranscriptionSection;
