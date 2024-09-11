// import { ModeToggle } from "@/components/mode-toggle";
// import { UserNav } from "@/components/admin-panel/user-nav";
import { UserDropdown } from "./client/user-dropdown";



export function Navbar({ title }) {
    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    {/* <SheetMenu /> */}
                    <h1 className="font-bold">{title}</h1>
                </div>
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
}