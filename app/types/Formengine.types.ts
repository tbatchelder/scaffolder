// ─────────────────────────────────────────────────────────────────────────────
// FIELD TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface BaseField {
	id: string;
	label: string;
	order: number;
	comment?: string;
	note?: string;
	required?: boolean;
}

export interface TextField extends BaseField {
	type: 'text';
	default?: string;
	placeholder?: string;
}

export interface TextareaField extends BaseField {
	type: 'textarea';
	lines?: number;
	default?: string;
	placeholder?: string;
}

export interface DropdownField extends BaseField {
	type: 'dropdown';
	options: string[];
	allowCustom?: boolean;
	default?: string;
}

export interface ToggleField extends BaseField {
	type: 'toggle';
	default?: boolean;
}

export interface RadioField extends BaseField {
	type: 'radio';
	options: string[];
	default?: string;
}

export interface CheckboxGroupField extends BaseField {
	type: 'checkbox-group';
	options: string[];
	default?: string[];
}

export interface SentenceListField extends BaseField {
	type: 'sentence-list';
	default?: string[];
}

export interface TagListField extends BaseField {
	type: 'tag-list';
	default?: string[];
}

export interface SimpleListField extends BaseField {
	type: 'list';
	itemType: 'text';
	default?: string[];
}

export interface ObjectListField extends BaseField {
	type: 'list';
	itemFields: FormField[];
	default?: Record<string, unknown>[];
}

export type FormField =
	| TextField
	| TextareaField
	| DropdownField
	| ToggleField
	| RadioField
	| CheckboxGroupField
	| SentenceListField
	| TagListField
	| SimpleListField
	| ObjectListField;

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT FILE STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────

export interface ContentFile {
	title: string;
	note?: string;
	fields: FormField[];
}

export type ContentFiles = Record<string, ContentFile>;

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
	title: string;
	order: number;
	content?: string; // References a key in contentFiles
	children?: NavItem[];
}

export type Navigation = NavItem[];
