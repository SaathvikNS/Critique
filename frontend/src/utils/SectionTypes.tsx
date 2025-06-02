export interface TextSectionType {
	extracted_text: string | null;
}

export interface DetectionType {
	label: string;
	confidence: number;
	box: number[];
}

type CategoryType = [cateory: string, count: number];

export interface ObjectSectionType {
	detections: DetectionType[];
	object_counts: Record<string, number>;
	caption: string;
	category_tag: CategoryType[];
	salient_object: string;
}

type RGBType = Array<number>;

export interface QualitySectionType {
	sharpness: number;
	brightness: number;
	exposure: Record<string, number>;
	contrast: number;
	noise: number;
	dominant_colors: RGBType[];
	saturation: number;
	dynamic_range: number;
	localized_blur: number;
	white_balance_deviation: Record<string, number>;
}

interface VisualAppealType {
	visual_appeal_score: number;
	remark: string;
}

interface LeadingLinesType {
	leading_lines_detected: number;
	description: string;
	visualization_base64: string;
}

interface TextureType {
	average_distance: number;
	verdict: string;
}

interface NSRType {
	negative_space_ratio: number;
	verdict: string;
}

interface FocalType {
	confidence_score: number;
	verdict: string;
}

export interface AestheticSectionType {
	composition: string;
	balance: string;
	visual_appeal: VisualAppealType;
	color_aesthetics: Record<string, string>;
	palette_psycology: string;
	leading_lines: LeadingLinesType;
	texture_consistency: TextureType;
	negative_space_ratio: NSRType;
	focal_point: FocalType;
}

export interface EmotionSectionType {
	color_emotion: Record<string, number>;
}

export type SectionKey =
	| "text"
	| "object"
	| "quality"
	| "aesthetics"
	| "emotion";
