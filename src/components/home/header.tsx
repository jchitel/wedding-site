import { Fragment } from "react";
import cx from "classnames";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { differenceInDays } from "date-fns";

const navigation = [
    { name: "Pricing", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Company", href: "#" },
];

export function Header() {
    return (
        <header>
            <Popover className="relative bg-blue-900 border-t-4 border-t-yellow-500">
                {/** Flex container for the items in the header */}
                <div
                    className={cx(
                        "flex justify-between md:justify-center items-start",
                        "max-w-7xl",
                        "mx-auto px-4 sm:px-6 lg:px-8 py-6 md:space-x-10"
                    )}
                >
                    <MobileNavToggle />
                    <HeaderContent />
                    <div className="md:hidden" />
                </div>

                <MobileNav />
            </Popover>
        </header>
    );
}

/**
 * Menu button that opens the mobile navigation menu.
 * This button is only visible up to `md` screens.
 */
function MobileNavToggle() {
    return (
        /* The `w-0` allows the header content to be centered in the overall container, ignoring the width of this button */
        <div className="-mr-2 -my-2 md:hidden w-0">
            <Popover.Button
                className={cx(
                    "inline-flex items-center justify-center",
                    "rounded-md p-2",
                    "bg-blue-900 hover:bg-blue-800",
                    "text-slate-100 hover:text-slate-50",
                    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
                )}
            >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
        </div>
    );
}

const ceremonyTime = new Date(1529782440000);
const today = new Date();

function HeaderContent() {
    // date-fns has an `intervalToDuration()` that would be really useful here but unfortunately
    // the units it returns can't be customized. We want things in days but it returns years/months/days.
    // Perhaps in the second version of the site I can change the countdown format to allow for that.
    const days = differenceInDays(today, ceremonyTime);

    return (
        <div className="md:pt-16 md:pb-10 text-slate-100 flex flex-col items-center">
            <h1
                className={cx(
                    "pb-2",
                    "font-medium tracking-widest",
                    "text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                )}
            >
                MEGAN <span className="font-thin">+</span> JAKE
            </h1>
            <SubHeader>JUNE 23, 2018 &middot; MILWAUKEE, WI</SubHeader>
            <SubHeader className="hidden md:inline">
                MARRIED FOR {days} DAYS!
            </SubHeader>
        </div>
    );
}

function SubHeader({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <span
            className={cx(
                className,
                "text-sm md:text-base lg:text-lg xl:text-xl",
                // setting the font size above also sets the line height,
                // so we need the explicit prefixes on the `leading-tight` below
                "leading-tight md:leading-tight lg:leading-tight xl:leading-tight",
                "tracking-wide words-wide"
            )}
        >
            {children}
        </span>
    );
}

function HeaderLink({ href, children }: { href: string; children: string }) {
    return (
        <a
            href={href}
            className="text-base font-medium text-slate-100 hover:text-slate-500"
        >
            {children}
        </a>
    );
}

/**
 * The mobile navigation manu, toggled by `MobileNavToggle`.
 * This menu is only visible up to `md` screens.
 */
function MobileNav() {
    return (
        <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <Popover.Panel
                focus
                className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                    <div className="pt-5 pb-6 px-5">
                        <div className="flex items-center justify-end">
                            <div className="-mr-2">
                                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Close menu</span>
                                    <XIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </Popover.Button>
                            </div>
                        </div>
                    </div>
                    <nav className="pb-6 px-5">
                        <div className="grid grid-cols-2 gap-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>
            </Popover.Panel>
        </Transition>
    );
}
