export interface TranscriptionSectionType {
	transcript: string;
	language: string;
	duration_seconds: number;
	average_confidence_percent: number;
	source_type: string;
}

export interface SummarySectionType {
	summary_text: string;
}

type ToneType = [string, Array<string>];

export interface ToneSectionType {
	tone: ToneType;
}

export type TopicSectionType = Record<string, number>;

export type EntitySectionType = string[][];

export type ClaritySectionType = Record<string, number>;

export type MusicalSectionType = Record<string, number>;

export type SectionKey =
	| "transcription"
	| "summary"
	| "tone"
	| "topic"
	| "entity"
	| "clarity"
	| "musical";
