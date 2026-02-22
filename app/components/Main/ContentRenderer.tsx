'use client';

import React from 'react';
import { theme } from '../../lib/theme';
import type { ContentFile } from '../../types/Formengine.types';
import { FieldRenderer } from './FormFields';

interface ContentRendererProps {
	content: ContentFile | null;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
	if (!content) {
		return (
			<div className="p-8 flex items-center justify-center h-full">
				<p className="text-lg italic" style={{ color: theme.palette.silver2 }}>
					Select a section from the navigation to begin
				</p>
			</div>
		);
	}

	return (
		<div className="p-8 space-y-6 max-w-4xl">
			{/* Title */}
			<h1
				className="text-3xl font-black uppercase tracking-tight"
				style={{ color: theme.palette.unicornWhite }}
			>
				{content.title}
			</h1>

			{/* Optional note/description */}
			{content.note && (
				<p
					className="text-sm border-l-4 pl-4 py-2"
					style={{
						color: theme.palette.silver,
						borderColor: theme.palette.dragonYellow,
					}}
				>
					{content.note}
				</p>
			)}

			{/* Fields sorted by order */}
			<div className="space-y-6">
				{content.fields
					.sort((a, b) => a.order - b.order)
					.map(field => (
						<FieldRenderer key={field.id} field={field} section={content.title} />
					))}
			</div>
		</div>
	);
}
