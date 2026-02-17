import Image from 'next/image';
import ProjectDropdown from './HeaderDetails/ProjectDropdown';
import Settings from './HeaderDetails/Settings';
import UserProfile from './HeaderDetails/UserProfile';

const Header = () => {
	return (
		<>
			{/* --- HEADER --- */}
			<header className="flex items-center justify-between gradient-diagonal">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						{/* Visual "Branding" baked in */}
						<Image src="/beam-logo.svg" className="logo" alt="Logo" width={30} height={30} />
						<Image src="/logo.png" className="logo" alt="Logo" width={30} height={30} />
						<h1 className="headerTitle">Scaffolder</h1>
					</div>
					<div className="h-6 w-px bg-stone-300 mx-2" />
					<ProjectDropdown currentUser={currentUser} />
				</div>

				<div className="flex items-center gap-4">
					<Settings />
					<UserProfile username={currentUser} onLogout={handleLogout} />
				</div>
			</header>
		</>
	);
};

export default Header;
