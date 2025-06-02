export type IndexPair = [number, number];

export interface CritiqueItem {
	category: string;
	meaning: string;
	critique: string;
}

export interface GrammarContentType {
	original_text: string;
	issue_indeces: IndexPair[];
	corrected_text: string;
	correct_indeces: IndexPair[];
	critique: CritiqueItem[];
}

export interface complexWords {
	word: string;
	suggestions: string[];
}

export type ReadabilityContentType = [
	{
		reading_ease: number;
		standard_grade: string;
		reading_time: number;
	},
	complexWords[]
];

export interface HighlightedWordProps {
	original_word: string;
	suggestion_array: string[];
	isMobile: boolean;
}

export type ToneType = [string, string[]];

export interface ToneContentType {
	tone: ToneType;
	current_tone_example: Record<string, string>;
	other_tone_example: Record<string, string>;
}

export type SummaryContentType = {
	summary_text: string;
};

export interface KeywordContentType {
	word_count: Record<string, number>;
	phrases: string[];
	keywords: string[];
	syllable_count: number;
	lexicon_count: number;
	sentence_count: number;
	character_count: number;
	average_words_per_sentence: number;
	unique_words: string[];
	type_token_ratio: number;
}

export type TopicContentType = Record<string, number>;

export type EntityContentType = string[][];

export type SectionKey = keyof SectionDataMap;

export type SectionContentTypeMap = {
	[K in SectionKey]: Parameters<SectionDataMap[K]>[0]["content"];
};

export type SectionData = {
	[K in SectionKey]: {
		loading: boolean;
		content: SectionContentTypeMap[K];
	};
};

export type SectionDataMap = {
	grammar: React.FC<{ content: GrammarContentType }>;
	readability: React.FC<{ content: ReadabilityContentType }>;
	tone: React.FC<{ content: ToneContentType }>;
	summary: React.FC<{ content: SummaryContentType }>;
	keyword: React.FC<{ content: KeywordContentType }>;
	topic: React.FC<{ content: TopicContentType }>;
	entity: React.FC<{ content: EntityContentType }>;
};
