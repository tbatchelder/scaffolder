'use client';

import React, { useState } from 'react';
import { theme } from '../../lib/theme';
import { useProject } from '../../contexts/ProjectContext';
import type { FormField } from '../../types/Formengine.types';

// ─────────────────────────────────────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────────────────────────────────────

const inputBaseStyle: React.CSSProperties = {
	backgroundColor: theme.palette.silver,
	borderColor: theme.palette.emberBlack,
	color: theme.palette.emberBlack,
	borderWidth: '2px',
	borderStyle: 'solid',
};

const buttonBaseStyle: React.CSSProperties = {
	backgroundColor: theme.palette.dragonOrange,
	borderColor: theme.palette.emberBlack,
	color: theme.palette.emberBlack,
	borderWidth: '2px',
	borderStyle: 'solid',
	fontWeight: 'bold',
	textTransform: 'uppercase',
	fontSize: '0.75rem',
	padding: '0.5rem 1rem',
	cursor: 'pointer',
};

const removeButtonStyle: React.CSSProperties = {
	...buttonBaseStyle,
	backgroundColor: theme.palette.dragonRed,
	padding: '0.25rem 0.5rem',
};

// ─────────────────────────────────────────────────────────────────────────────
// TEXT FIELD
// ─────────────────────────────────────────────────────────────────────────────

export function TextField({
	field,
	section,
}: {
	field: Extract<FormField, { type: 'text' }>;
	section: string;
}) {
	const { updateField } = useProject();

	return (
		<div className="flex flex-col space-y-2">
			<label className="font-black uppercase text-sm" style={{ color: theme.palette.emberBlack }}>
				{field.label}
				{field.required && <span style={{ color: theme.palette.dragonRed }}> *</span>}
			</label>

			<input
				type="text"
				className="rounded px-3 py-2 transition-colors focus:outline-none"
				style={inputBaseStyle}
				placeholder={field.placeholder}
				defaultValue={field.default}
				onChange={e => updateField(section, field.id, e.target.value)}
			/>

			{field.comment && (
				<p className="text-xs" style={{ color: theme.palette.ember2 }}>
					{field.comment}
				</p>
			)}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXTAREA FIELD
// ─────────────────────────────────────────────────────────────────────────────

export function TextareaField({
	field,
	section,
}: {
	field: Extract<FormField, { type: 'textarea' }>;
	section: string;
}) {
	const { updateField } = useProject();

	return (
		<div className="flex flex-col space-y-2">
			<label className="font-black uppercase text-sm" style={{ color: theme.palette.emberBlack }}>
				{field.label}
			</label>

			<textarea
				className="rounded px-3 py-2 transition-colors focus:outline-none resize-y"
				style={inputBaseStyle}
				rows={field.lines || 3}
				placeholder={field.placeholder}
				defaultValue={field.default}
				onChange={e => updateField(section, field.id, e.target.value)}
			/>

			{field.comment && (
				<p className="text-xs" style={{ color: theme.palette.ember2 }}>
					{field.comment}
				</p>
			)}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// DROPDOWN FIELD
// ─────────────────────────────────────────────────────────────────────────────

export function DropdownField({
	field,
	section,
}: {
	field: Extract<FormField, { type: 'dropdown' }>;
	section: string;
}) {
	const { updateField } = useProject();

	return (
		<div className="flex flex-col space-y-2">
			<label className="font-black uppercase text-sm" style={{ color: theme.palette.emberBlack }}>
				{field.label}
			</label>

			<select
				className="rounded px-3 py-2 cursor-pointer transition-colors focus:outline-none"
				style={inputBaseStyle}
				defaultValue={field.default || ''}
				onChange={e => updateField(section, field.id, e.target.value)}
			>
				<option value="">Select...</option>
				{field.options.map(opt => (
					<option key={opt} value={opt}>
						{opt}
					</option>
				))}
			</select>

			{field.note && (
				<p className="text-xs" style={{ color: theme.palette.ember2 }}>
					{field.note}
				</p>
			)}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// TOGGLE FIELD
// ─────────────────────────────────────────────────────────────────────────────

export function ToggleField({
	field,
	section,
}: {
	field: Extract<FormField, { type: 'toggle' }>;
	section: string;
}) {
	const { updateField } = useProject();

	return (
		<div className="flex items-center space-x-3">
			<label className="font-black uppercase text-sm" style={{ color: theme.palette.emberBlack }}>
				{field.label}
			</label>

			<input
				type="checkbox"
				className="w-5 h-5 cursor-pointer"
				defaultChecked={field.default || false}
				onChange={e => updateField(section, field.id, e.target.checked)}
			/>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// RADIO FIELD
// ─────────────────────────────────────────────────────────────────────────────

export function RadioField({
	field,
	section,
}: {
	field: Extract<FormField, { type: 'radio' }>;
	section: string;
}) {
	const { updateField } = useProject();

	return (
		<div className="flex flex-col space-y-2">
			<label className="font-black uppercase text-sm" style={{ color: theme.palette.emberBlack }}>
				{field.label}
			</label>

			<div className="space-y-2">
				{field.options.map(opt => (
					<label key={opt} className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name={`${section}-${field.id}`}
							value={opt}
							defaultChecked={field.default === opt}
							onChange={e => updateField(section, field.id, e.target.value)}
							className="w-4 h-4 cursor-pointer"
						/>
						<span style={{ color: theme.palette.emberBlack }}>{opt}</span>
					</label>
				))}
			</div>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKBOX GROUP FIELD
// ─────────────────────────────────────────────────────────────────────────────

export function CheckboxGroupField({
	field,
	section,
}: {
	field: Extract<FormField, { type: 'checkbox-group' }>;
	section: string;
}) {
	const { updateField } = useProject();

	const toggleValue = (value: string, checked: boolean) => {
		updateField(section, field.id, (prev): string[] => {
			const current = Array.isArray(prev) ? (prev as string[]) : [];
			if (checked) return [...current, value];
			return current.filter(v => v !== value);
		});
	};

	return (
		<div className="flex flex-col space-y-2">
			<label className="font-black uppercase text-sm" style={{ color: theme.palette.emberBlack }}>
				{field.label}
			</label>

			<div className="space-y-2">
				{field.options.map(opt => (
					<label key={opt} className="flex items-center space-x-2 cursor-pointer">
						<input
							type="checkbox"
							value={opt}
							onChange={e => toggleValue(opt, e.target.checked)}
							className="w-4 h-4 cursor-pointer"
						/>
						<span style={{ color: theme.palette.emberBlack }}>{opt}</span>
					</label>
				))}
			</div>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// SENTENCE LIST FIELD
// ─────────────────────────────────────────────────────────────────────────────

export function SentenceListField({
	field,
	section,
}: {
	field: Extract<FormField, { type: 'sentence-list' }>;
	section: string;
}) {
	const { updateField } = useProject();
	const [items, setItems] = useState<string[]>(field.default || []);

	const addItem = () => {
		const updated = [...items, ''];
		setItems(updated);
		updateField(section, field.id, updated);
	};

	const updateItem = (index: number, value: string) => {
		const updated = [...items];
		updated[index] = value;
		setItems(updated);
		updateField(section, field.id, updated);
	};

	const removeItem = (index: number) => {
		const updated = items.filter((_, i) => i !== index);
		setItems(updated);
		updateField(section, field.id, updated);
	};

	return (
		<div className="flex flex-col space-y-2">
			<label className="font-black uppercase text-sm" style={{ color: theme.palette.emberBlack }}>
				{field.label}
			</label>

			{items.map((item, i) => (
				<div key={i} className="flex space-x-2">
					<input
						type="text"
						className="rounded px-3 py-2 flex-1 transition-colors focus:outline-none"
						style={inputBaseStyle}
						placeholder="One sentence..."
						value={item}
						onChange={e => updateItem(i, e.target.value)}
					/>
					<button
						className="rounded transition-all hover:brightness-110"
						style={removeButtonStyle}
						onClick={() => removeItem(i)}
					>
						✕
					</button>
				</div>
			))}

			<button
				className="rounded w-fit transition-all hover:brightness-110"
				style={buttonBaseStyle}
				onClick={addItem}
			>
				Add Sentence
			</button>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// TAG LIST FIELD
// ─────────────────────────────────────────────────────────────────────────────

export function TagListField({
	field,
	section,
}: {
	field: Extract<FormField, { type: 'tag-list' }>;
	section: string;
}) {
	const { updateField } = useProject();
	const [tags, setTags] = useState<string[]>(field.default || []);
	const [input, setInput] = useState('');

	const addTag = () => {
		if (!input.trim()) return;
		const updated = [...tags, input.trim()];
		setTags(updated);
		updateField(section, field.id, updated);
		setInput('');
	};

	const removeTag = (tag: string) => {
		const updated = tags.filter(t => t !== tag);
		setTags(updated);
		updateField(section, field.id, updated);
	};

	return (
		<div className="flex flex-col space-y-2">
			<label className="font-black uppercase text-sm" style={{ color: theme.palette.emberBlack }}>
				{field.label}
			</label>

			<div className="flex space-x-2">
				<input
					className="rounded px-3 py-2 flex-1 transition-colors focus:outline-none"
					style={inputBaseStyle}
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyDown={e => e.key === 'Enter' && addTag()}
					placeholder="Add tag..."
				/>
				<button
					className="rounded transition-all hover:brightness-110"
					style={buttonBaseStyle}
					onClick={addTag}
				>
					Add
				</button>
			</div>

			<div className="flex flex-wrap gap-2">
				{tags.map(tag => (
					<span
						key={tag}
						className="rounded px-3 py-1 cursor-pointer font-semibold text-sm transition-all hover:brightness-90"
						style={{
							backgroundColor: theme.palette.dragonYellow,
							color: theme.palette.emberBlack,
						}}
						onClick={() => removeTag(tag)}
					>
						{tag} ✕
					</span>
				))}
			</div>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMPLE LIST FIELD (just text items)
// ─────────────────────────────────────────────────────────────────────────────

export function SimpleListField({
	field,
	section,
}: {
	field: Extract<FormField, { type: 'list'; itemType: 'text' }>;
	section: string;
}) {
	const { updateField } = useProject();
	const [items, setItems] = useState<string[]>(field.default || []);

	const addItem = () => {
		const updated = [...items, ''];
		setItems(updated);
		updateField(section, field.id, updated);
	};

	const updateItem = (index: number, value: string) => {
		const updated = [...items];
		updated[index] = value;
		setItems(updated);
		updateField(section, field.id, updated);
	};

	const removeItem = (index: number) => {
		const updated = items.filter((_, i) => i !== index);
		setItems(updated);
		updateField(section, field.id, updated);
	};

	return (
		<div className="flex flex-col space-y-2">
			<label className="font-black uppercase text-sm" style={{ color: theme.palette.emberBlack }}>
				{field.label}
			</label>

			{items.map((item, i) => (
				<div key={i} className="flex space-x-2">
					<input
						type="text"
						className="rounded px-3 py-2 flex-1 transition-colors focus:outline-none"
						style={inputBaseStyle}
						value={item}
						placeholder="Enter value..."
						onChange={e => updateItem(i, e.target.value)}
					/>
					<button
						className="rounded transition-all hover:brightness-110"
						style={removeButtonStyle}
						onClick={() => removeItem(i)}
					>
						✕
					</button>
				</div>
			))}

			<button
				className="rounded w-fit transition-all hover:brightness-110"
				style={buttonBaseStyle}
				onClick={addItem}
			>
				Add Item
			</button>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// OBJECT LIST FIELD (with recursive nesting support + FIXED INDENTATION)
// ─────────────────────────────────────────────────────────────────────────────
// KEY FIX: Added `depth` prop to track nesting level and apply progressive
// left padding (depth × 16px). Each nested ObjectListField increments depth.

export function ObjectListField({
	field,
	section,
	depth = 0,
}: {
	field: Extract<FormField, { type: 'list'; itemFields: FormField[] }>;
	section: string;
	depth?: number;
}) {
	const { updateField } = useProject();
	const [items, setItems] = useState<Record<string, unknown>[]>(field.default || []);

	const addItem = () => {
		const newItem: Record<string, unknown> = {};
		field.itemFields.forEach(f => {
			if (f.type === 'list') {
				newItem[f.id] = [];
			} else {
				newItem[f.id] = '';
			}
		});

		const updated = [...items, newItem];
		setItems(updated);
		updateField(section, field.id, updated);
	};

	const updateItemField = (index: number, fieldId: string, value: unknown) => {
		const updated = [...items];
		updated[index][fieldId] = value;
		setItems(updated);
		updateField(section, field.id, updated);
	};

	const removeItem = (index: number) => {
		const updated = items.filter((_, i) => i !== index);
		setItems(updated);
		updateField(section, field.id, updated);
	};

	// Calculate indentation based on depth
	const indentPx = depth * 16;

	return (
		<div className="flex flex-col space-y-3" style={{ paddingLeft: `${indentPx}px` }}>
			<label
				className="font-black uppercase text-sm"
				style={{ color: depth > 0 ? theme.palette.ember2 : theme.palette.emberBlack }}
			>
				{field.label}
			</label>

			{items.map((item, i) => (
				<div
					key={i}
					className="border-2 rounded-lg p-4 space-y-3 shadow-md"
					style={{
						backgroundColor: depth % 2 === 0 ? theme.palette.unicornWhite : theme.palette.silver,
						borderColor: theme.palette.emberBlack,
					}}
				>
					{/* Item header */}
					<div className="flex justify-between items-center">
						<h3
							className="font-black uppercase text-sm"
							style={{ color: theme.palette.emberBlack }}
						>
							{field.label} #{i + 1}
						</h3>
						<button
							className="rounded transition-all hover:brightness-110"
							style={removeButtonStyle}
							onClick={() => removeItem(i)}
						>
							Remove
						</button>
					</div>

					{/* Item fields */}
					{field.itemFields
						.sort((a, b) => a.order - b.order)
						.map(subField => (
							<div key={subField.id}>
								{/* Render each subfield based on its type */}
								{subField.type === 'text' && (
									<TextField field={subField} section={`${section}.${field.id}.${i}`} />
								)}

								{subField.type === 'textarea' && (
									<TextareaField field={subField} section={`${section}.${field.id}.${i}`} />
								)}

								{subField.type === 'dropdown' && (
									<DropdownField field={subField} section={`${section}.${field.id}.${i}`} />
								)}

								{subField.type === 'toggle' && (
									<ToggleField field={subField} section={`${section}.${field.id}.${i}`} />
								)}

								{subField.type === 'radio' && (
									<RadioField field={subField} section={`${section}.${field.id}.${i}`} />
								)}

								{subField.type === 'checkbox-group' && (
									<CheckboxGroupField field={subField} section={`${section}.${field.id}.${i}`} />
								)}

								{/* RECURSIVE CASE: nested ObjectListField */}
								{subField.type === 'list' && 'itemFields' in subField && (
									<ObjectListField
										field={subField}
										section={`${section}.${field.id}.${i}`}
										depth={depth + 1} // INCREMENT DEPTH for visual nesting
									/>
								)}

								{/* Simple list fallback */}
								{subField.type === 'list' &&
									'itemType' in subField &&
									subField.itemType === 'text' && (
										<SimpleListField field={subField} section={`${section}.${field.id}.${i}`} />
									)}
							</div>
						))}
				</div>
			))}

			<button
				className="rounded w-fit transition-all hover:brightness-110"
				style={buttonBaseStyle}
				onClick={addItem}
			>
				Add {field.label}
			</button>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// FIELD RENDERER (Router)
// ─────────────────────────────────────────────────────────────────────────────

export function FieldRenderer({ field, section }: { field: FormField; section: string }) {
	switch (field.type) {
		case 'text':
			return <TextField field={field} section={section} />;
		case 'textarea':
			return <TextareaField field={field} section={section} />;
		case 'dropdown':
			return <DropdownField field={field} section={section} />;
		case 'toggle':
			return <ToggleField field={field} section={section} />;
		case 'radio':
			return <RadioField field={field} section={section} />;
		case 'checkbox-group':
			return <CheckboxGroupField field={field} section={section} />;
		case 'sentence-list':
			return <SentenceListField field={field} section={section} />;
		case 'tag-list':
			return <TagListField field={field} section={section} />;
		case 'list':
			if ('itemFields' in field) {
				return <ObjectListField field={field} section={section} depth={0} />;
			}
			if ('itemType' in field && field.itemType === 'text') {
				return <SimpleListField field={field} section={section} />;
			}
			return <div style={{ color: theme.palette.dragonRed }}>Unknown list configuration</div>;
		default:
			return <div style={{ color: theme.palette.dragonRed }}>Unknown field type</div>;
	}
}
