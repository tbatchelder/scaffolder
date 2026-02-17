interface ProjectDropdownProps {
	currentUser: string;
}

export default function ProjectDropdown({ currentUser }: ProjectDropdownProps) {
	return (
		<select>
			<option>New Project</option>
			{/* Logic to map files from Documents/Scaffolder/{currentUser} */}
		</select>
	);
}
