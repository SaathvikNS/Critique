type ContentType = {
	summary_text: string;
};

const SummarySection = ({ content }: { content: ContentType }) => {
	return (
		<div>
			<p className="text-justify px-4">&emsp;{content.summary_text}</p>
		</div>
	);
};

export default SummarySection;
