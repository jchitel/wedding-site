import { Fragment } from "react";
import cx from "classnames";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
    { name: "Pricing", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Company", href: "#" },
];

export function Header() {
    return (
        <header>
            <Popover className="relative bg-blue-900">
                {/** Flex container for the items in the header */}
                <div
                    className={cx(
                        "flex justify-end md:justify-center items-center",
                        "max-w-7xl",
                        "mx-auto px-4 sm:px-6 lg:px-8 py-6 md:space-x-10"
                    )}
                >
                    <MobileHeaderToggle />
                    <BigScreenHeaderItems />
                </div>

                <MobileHeaderPanel />
            </Popover>
        </header>
    );
}

function MobileHeaderToggle() {
    return (
        <div className="-mr-2 -my-2 md:hidden">
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

function BigScreenHeaderItems() {
    return (
        <Popover.Group as="nav" className="hidden md:flex space-x-10">
            {navigation.map((item) => (
                <HeaderLink key={item.name} href={item.href}>
                    {item.name}
                </HeaderLink>
            ))}
        </Popover.Group>
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

function MobileHeaderPanel() {
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
                {/**
                 * This is the container for the visible content of the mobile popover panel.
                 * It has rounded corners and a box shadow
                 */}
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
                    <div className="pb-6 px-5">
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
                    </div>
                </div>
            </Popover.Panel>
        </Transition>
    );
}
