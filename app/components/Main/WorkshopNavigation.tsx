'use client';

import React, { useState, useEffect } from 'react';
import { theme } from '../../lib/theme';

interface NavItem {
	id: string;
	title: string;
	href: string;
	children: NavItem[];
}

interface WorkshopNavigationProps {
	onDepthChange: (depth: number) => void;
}

// ─── MOCK NAV DATA (replace with real project structure later) ──────────────
const MOCK_NAV_DATA: NavItem[] = [
	{
		id: 'overview',
		title: 'Project Overview',
		href: '/overview',
		children: [],
	},
	{
		id: 'structure',
		title: 'Building Structure',
		href: '/structure',
		children: [
			{
				id: 'structure-foundation',
				title: 'Foundation',
				href: '/structure/foundation',
				children: [],
			},
			{
				id: 'structure-framing',
				title: 'Framing',
				href: '/structure/framing',
				children: [
					{
						id: 'structure-framing-walls',
						title: 'Wall Framing',
						href: '/structure/framing/walls',
						children: [],
					},
					{
						id: 'structure-framing-roof',
						title: 'Roof Framing',
						href: '/structure/framing/roof',
						children: [],
					},
				],
			},
		],
	},
	{
		id: 'electrical',
		title: 'Electrical',
		href: '/electrical',
		children: [
			{
				id: 'electrical-rough',
				title: 'Rough-In',
				href: '/electrical/rough',
				children: [],
			},
			{
				id: 'electrical-finish',
				title: 'Finish Work',
				href: '/electrical/finish',
				children: [],
			},
		],
	},
	{
		id: 'plumbing',
		title: 'Plumbing',
		href: '/plumbing',
		children: [],
	},
];

// ─── LAYOUT CONSTANTS ────────────────────────────────────────────────────────
const BUTTON_WIDTH = 180;
const INDENT_PER_LEVEL = 14;
const PADDING = 16;
const COLLAPSED_WIDTH = 60;

export default function WorkshopNavigation({ onDepthChange }: WorkshopNavigationProps) {
	const [expanded, setExpanded] = useState(false);
	const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
	const [deepestLevel, setDeepestLevel] = useState(0);

	// ─── COMPUTE DEEPEST VISIBLE LEVEL ───────────────────────────────────────
	// Walk the tree and find the deepest node that's currently open
	const computeDeepestLevel = (tree: NavItem[], map: Record<string, boolean>): number => {
		let maxDepth = 0;

		function walk(node: NavItem, depth: number) {
			maxDepth = Math.max(maxDepth, depth);
			if (map[node.id]) {
				node.children.forEach(child => walk(child, depth + 1));
			}
		}

		tree.forEach(item => walk(item, 0));
		return maxDepth;
	};

	// ─── TOGGLE NODE OPEN/CLOSED ─────────────────────────────────────────────
	const toggleNode = (id: string, depth: number) => {
		setOpenMap(prev => {
			const isOpening = !prev[id];

			if (isOpening) {
				// Opening: update deepest level immediately
				setDeepestLevel(prevLevel => Math.max(prevLevel, depth));
				return { ...prev, [id]: true };
			}

			// Closing: recalculate deepest level after this node closes
			const newMap = { ...prev, [id]: false };
			const newDeepest = computeDeepestLevel(MOCK_NAV_DATA, newMap);
			setDeepestLevel(newDeepest);
			return newMap;
		});
	};

	// ─── NOTIFY PARENT OF DEPTH CHANGES ──────────────────────────────────────
	useEffect(() => {
		onDepthChange(deepestLevel);
	}, [deepestLevel, onDepthChange]);

	// ─── CALCULATE EXPANDED WIDTH ────────────────────────────────────────────
	const expandedWidth = BUTTON_WIDTH + PADDING * 2 + INDENT_PER_LEVEL * deepestLevel;

	// ─── RENDER ──────────────────────────────────────────────────────────────
	return (
		<div
			className="absolute top-0 left-0 h-full z-50 border-r-2"
			style={{ borderColor: theme.palette.emberBlack }}
			onMouseEnter={() => setExpanded(true)}
			onMouseLeave={() => setExpanded(false)}
		>
			<div
				className="h-full transition-all duration-300 ease-out overflow-hidden"
				style={{
					width: expanded ? expandedWidth : COLLAPSED_WIDTH,
					backgroundColor: expanded
						? 'rgba(216, 216, 216, 0.75)' // silver semi-transparent
						: theme.palette.silver, // solid silver when collapsed
					backdropFilter: expanded ? 'blur(3px)' : 'none',
					WebkitBackdropFilter: expanded ? 'blur(3px)' : 'none',
				}}
			>
				{/* Collapsed state: show expand hint */}
				{!expanded && (
					<div
						className="flex items-center justify-center h-full"
						style={{ color: theme.palette.emberBlack }}
					>
						<span className="text-2xl font-black">➤</span>
					</div>
				)}

				{/* Expanded state: show nav tree */}
				{expanded && (
					<div className="h-full overflow-y-auto p-3 space-y-1">
						{MOCK_NAV_DATA.map(item => (
							<NavItemComponent
								key={item.id}
								item={item}
								depth={0}
								openMap={openMap}
								toggleNode={toggleNode}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

// ─── INDIVIDUAL NAV ITEM COMPONENT ───────────────────────────────────────────

interface NavItemComponentProps {
	item: NavItem;
	depth: number;
	openMap: Record<string, boolean>;
	toggleNode: (id: string, depth: number) => void;
}

function NavItemComponent({ item, depth, openMap, toggleNode }: NavItemComponentProps) {
	const isOpen = openMap[item.id] || false;
	const hasChildren = item.children.length > 0;
	const [isHovered, setIsHovered] = React.useState(false);

	// TODO: Track active/current route and set isActive = true when this item matches
	const isActive = false;

	// ─── BUTTON STATE COLORS ─────────────────────────────────────────────────
	let bgColor = theme.palette.silver2; // base
	if (isActive)
		bgColor = theme.palette.dragonOrange; // active
	else if (isHovered) bgColor = theme.palette.dragonYellow; // hover

	return (
		<div>
			{/* The nav button */}
			<div style={{ marginLeft: depth * INDENT_PER_LEVEL }}>
				<div
					className="flex items-center justify-between rounded px-2 py-1.5 cursor-pointer transition-all duration-150 border-2"
					style={{
						width: BUTTON_WIDTH,
						backgroundColor: bgColor,
						borderColor: theme.palette.emberBlack,
						color: theme.palette.emberBlack,
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{/* Title — clicking navigates */}
					<div
						className="flex-1 truncate text-sm font-bold uppercase tracking-tight"
						onClick={() => console.log('Navigate to:', item.href)}
					>
						{item.title}
					</div>

					{/* Expand/collapse arrow if has children */}
					{hasChildren && (
						<div
							className="flex items-center justify-center w-5 h-5 rounded-full ml-2 cursor-pointer"
							style={{
								backgroundColor: theme.palette.emberBlack,
							}}
							onClick={e => {
								e.stopPropagation();
								toggleNode(item.id, depth + 1);
							}}
						>
							<span
								className="text-[10px] font-black transition-transform select-none"
								style={{
									transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
									color: theme.palette.unicornBlue,
								}}
							>
								▶
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Children — render recursively if open */}
			{isOpen && hasChildren && (
				<div className="mt-1 space-y-1">
					{item.children.map(child => (
						<NavItemComponent
							key={child.id}
							item={child}
							depth={depth + 1}
							openMap={openMap}
							toggleNode={toggleNode}
						/>
					))}
				</div>
			)}
		</div>
	);
}
