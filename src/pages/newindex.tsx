import Image from "next/image";
import { Header } from "../components/home/header";
import coupleImage from "../images/megan-jake.jpg";

export default function Home() {
    return (
        <div className="bg-blue-900">
            <Header />
            <main>
                <HeroCard />

                {/* More main page content here... */}
            </main>
        </div>
    );
}

function HeroCard() {
    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            className="h-full w-full object-cover"
                            src={coupleImage}
                            alt="The adorable wedding couple"
                        />
                        <div className="absolute inset-0 bg-yellow-700 mix-blend-soft-light" />
                    </div>
                    <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-white">
                                Take control of your
                            </span>
                            <span className="block text-yellow-200">
                                customer support
                            </span>
                        </h1>
                        <p className="mt-6 max-w-lg mx-auto text-center text-xl text-yellow-200 sm:max-w-3xl">
                            Anim aute id magna aliqua ad ad non deserunt sunt.
                            Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat aliqua.
                        </p>
                        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-yellow-700 bg-white hover:bg-yellow-50 sm:px-8"
                                >
                                    Get started
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                                >
                                    Live demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
