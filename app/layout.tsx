import type { Metadata } from 'next';
import './globals.css';
import './theme.css';

export const metadata: Metadata = {
	title: 'Scaffolder',
	description: 'A visual display of features for agentic prompting.',
	creator: 'Timothy Batchelder',
	publisher: "B&E's Anthro Movies, Inc.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
