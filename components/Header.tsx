import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User }) => {
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* subtle top fade so it blends into the page nicely */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

            <div className="relative border-b border-white/10 bg-black/60 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40">
                <div className="container flex h-16 items-center justify-between gap-3">
                    {/* Left: Logo */}
                    <Link href="/" className="group flex items-center gap-2">
                        <Image
                            src="/assets/icons/logo12.svg"
                            alt="VibeMarket logo"
                            width={140}
                            height={32}
                            priority
                            className="h-8 w-auto cursor-pointer transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                        <span className="hidden sm:block text-sm font-semibold tracking-wide text-white/90">

            </span>
                    </Link>

                    {/* Center: Nav (pill) */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                            <NavItems initialStocks={initialStocks} />
                        </div>
                    </div>

                    {/* Right: Search + User */}
                    <div className="flex items-center gap-2">


                        <UserDropdown user={user} initialStocks={initialStocks} />
                    </div>
                </div>

                {/* gradient hairline divider */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>
        </header>
    );
};

export default Header;

