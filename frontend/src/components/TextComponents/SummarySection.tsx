import type { SummaryContentType } from "@/utils/TextContentTypes";

const SummarySection = ({ content }: { content: SummaryContentType }) => {
	return (
		<div>
			<p className="text-justify px-4">&emsp;{content.summary_text}</p>
		</div>
	);
};

export default SummarySection;
