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
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-96 md:h-[500px]">
                    <div className="absolute inset-0">
                        <Image
                            className="h-full w-full object-cover"
                            src={coupleImage}
                            alt="The adorable wedding couple"
                            layout="fill"
                        />
                        <div className="absolute inset-0 bg-blue-900 mix-blend-hue" />
                    </div>
                </div>
            </div>
        </div>
    );
}
