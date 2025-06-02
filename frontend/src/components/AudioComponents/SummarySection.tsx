import type { SummaryContentType } from "@/utils/TextContentTypes";

const SummarySection = ({ content }: { content: SummaryContentType }) => {
	return (
		<div>
			<div className="p-3 text-sm max-h-64 overflow-y-auto whitespace-pre-wrap">
				{content.summary_text}
			</div>
		</div>
	);
};

export default SummarySection;
