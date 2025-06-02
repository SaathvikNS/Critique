import type { TextSectionType } from "../../utils/SectionTypes";

const TextSection = ({ content }: { content: TextSectionType }) => {
	const normalized_text = content?.extracted_text
		?.replace(/[‘’´`]/g, "'")
		.replace(/[“”]/g, '"')
		.replace(/[–—~]/g, "-")
		.replace(/[\uFFFD]/g, "")
		.replace(/\s{2,}/g, " ")
		.replace(/(\d)\s*\.\s*(\d)/g, "$1.$2");

	const cleaned_text = normalized_text
		?.replace(/\s[=\-~/\\@{}()[\]<>|;:_+]{1,3}\s/g, " ")
		.replace(/[^a-zA-Z0-9\s.,'"/\-()]+/g, "")
		.replace(/\b(?:Trea|ev|7X)\b/g, "")
		.replace(/\s{2,}/g, " ")
		.trim();

	return (
		<div>
			{cleaned_text || (
				<p className="text-muted-foreground">No Text Found</p>
			)}
		</div>
	);
};

export default TextSection;
