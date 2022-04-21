import { Fragment } from "react";
import cx from "classnames";
import { Popover, Transition } from "@headlessui/react";
import {
    AnnotationIcon,
    ChatAlt2Icon,
    InboxIcon,
    MenuIcon,
    QuestionMarkCircleIcon,
    XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

const solutions = [
    {
        name: "Inbox",
        description:
            "Get a better understanding of where your traffic is coming from.",
        href: "#",
        icon: InboxIcon,
    },
    {
        name: "Messaging",
        description:
            "Speak directly to your customers in a more meaningful way.",
        href: "#",
        icon: AnnotationIcon,
    },
    {
        name: "Live Chat",
        description: "Your customers' data will be safe and secure.",
        href: "#",
        icon: ChatAlt2Icon,
    },
    {
        name: "Knowledge Base",
        description:
            "Connect with third-party tools that you're already using.",
        href: "#",
        icon: QuestionMarkCircleIcon,
    },
];
const navigation = [
    { name: "Pricing", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Company", href: "#" },
];

export default function Example() {
    return (
        /** This is the container for the whole damn page. It simply sets the base background color at all sizes. */
        <div className="bg-blue-900">
            {/** This is the header. It is a semantic element serving as a container and nothing else. */}
            <header>
                {/**
                 * This is the container for the popover, which encompasses the entire header content.
                 * This doesn't do anything itself but it sets up the context for the descendants.
                 * It renders as a <div /> and is set up to be position: relative, presumably for the positioning of children which we'll look into.
                 * This also sets up the header background as blue.
                 */}
                <Popover className="relative bg-blue-900">
                    {/** The popover has 2 children. This is the first.
                     * It is a flex container that always vertically aligns its items at the center.
                     * At smallest it justifies it's children with space-between, and at medium it left-justifies them.
                     * It has a fixed max width and will be centered on the page above that width.
                     * The Y padding is always a 6, and the X padding starts at 4, goes to 6 at small, and goes to 8 at large.
                     * At medium the children have space 10 between them.
                     */}
                    <div
                        className={cx(
                            "flex justify-between md:justify-start items-center",
                            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:space-x-10"
                        )}
                    >
                        {/** This is the first flex child of the above container, and is always visible.
                         * It is itself a flex container which always left-justifies its content.
                         * At large it sets its effective width to 0 and uses flex-1 to grow/shrink as needed.
                         * Setting the width to 0 is done so that the width of the item doesn't affect the flex position
                         * of other siblings.
                         * Its child is a link containing an image, presumably for the index page of the site.
                         */}
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="#">
                                <span className="sr-only">Workflow</span>
                                {/** This image starts with a height of 8, preserving its aspect ratio, and bumps to 10 at small */}
                                <img
                                    className="h-8 w-auto sm:h-10"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                    alt=""
                                />
                            </a>
                        </div>
                        {/** This is the second child of the above container, and is only visible until medium.
                         * It uses negative margins for right, top, and bottom, so that its padding allows it to expand outside of the flex container
                         * without affecting the container.
                         * This is the container for the popover button used on mobile screens to display the header links.
                         * It is not needed on larger screens because the links are displayed inline.
                         */}
                        <div className="-mr-2 -my-2 md:hidden">
                            {/** This is the button to toggle the popover on mobile screens.
                             * See the parent for visibility conditions. */}
                            <Popover.Button
                                className={cx(
                                    // the button has the default background by default, but gets lighter when you hover it
                                    "bg-blue-900 hover:bg-blue-800",
                                    // the button has a light grey color by defeault, but gets almost white when you hover it
                                    "text-slate-100 hover:text-slate-50",
                                    // the button has rounded corners and padding equivalent to the negative margin on the parent.
                                    // the roundedness is only visible on hover
                                    "rounded-md p-2",
                                    // the button is a flex container that aligns and justifies its single child in the center.
                                    "inline-flex items-center justify-center",
                                    // on focus, the default outline is hidden and replaced with a gold "ring" border
                                    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
                                )}
                            >
                                <span className="sr-only">Open menu</span>
                                {/** The child of the button is a menu icon which always has a size of 6 */}
                                <MenuIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </Popover.Button>
                        </div>
                        {/** This is the third child of the above container, and is invisible until medium.
                         * When it is visible, it is a flex container.
                         * Its children are spaced by 10.
                         *
                         */}
                        <Popover.Group
                            as="nav"
                            className="hidden md:flex space-x-10"
                        >
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            className={cx(
                                                open
                                                    ? "text-gray-900"
                                                    : "text-gray-500",
                                                "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            )}
                                        >
                                            <span>Solutions</span>
                                            <ChevronDownIcon
                                                className={cx(
                                                    open
                                                        ? "text-gray-600"
                                                        : "text-gray-400",
                                                    "ml-2 h-5 w-5 group-hover:text-gray-500"
                                                )}
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                                                        {solutions.map(
                                                            (item) => (
                                                                <a
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    href={
                                                                        item.href
                                                                    }
                                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                                >
                                                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white sm:h-12 sm:w-12">
                                                                        <item.icon
                                                                            className="h-6 w-6"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <p className="text-base font-medium text-gray-900">
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </p>
                                                                        <p className="mt-1 text-sm text-gray-500">
                                                                            {
                                                                                item.description
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </a>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>

                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </Popover.Group>
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            <a
                                href="#"
                                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                                Sign in
                            </a>
                            <a
                                href="#"
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Sign up
                            </a>
                        </div>
                    </div>

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
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                                alt="Workflow"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">
                                                    Close menu
                                                </span>
                                                <XIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <nav className="grid grid-cols-1 gap-7">
                                            {solutions.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                                                >
                                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
                                                        <item.icon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <div className="ml-4 text-base font-medium text-gray-900">
                                                        {item.name}
                                                    </div>
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                                <div className="py-6 px-5">
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
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Sign up
                                        </a>
                                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                                            Existing customer?
                                            <a
                                                href="#"
                                                className="text-gray-900"
                                            >
                                                Sign in
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </header>

            <main>
                <div>
                    {/* Hero card */}
                    <div className="relative">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                                <div className="absolute inset-0">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                                        alt="People working on laptops"
                                    />
                                    <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
                                </div>
                                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                    <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                        <span className="block text-white">
                                            Take control of your
                                        </span>
                                        <span className="block text-indigo-200">
                                            customer support
                                        </span>
                                    </h1>
                                    <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                                        Anim aute id magna aliqua ad ad non
                                        deserunt sunt. Qui irure qui lorem
                                        cupidatat commodo. Elit sunt amet fugiat
                                        veniam occaecat fugiat aliqua.
                                    </p>
                                    <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                                        <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                            <a
                                                href="#"
                                                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                                            >
                                                Get started
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                                            >
                                                Live demo
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logo cloud */}
                    <div className="bg-gray-100">
                        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                            <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                                Trusted by over 5 very average small businesses
                            </p>
                            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                                        alt="Tuple"
                                    />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
                                        alt="Mirage"
                                    />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                                        alt="StaticKit"
                                    />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                                        alt="Transistor"
                                    />
                                </div>
                                <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                                        alt="Workcation"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More main page content here... */}
            </main>
        </div>
    );
}
