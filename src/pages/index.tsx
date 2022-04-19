import type { NextPage } from "next";
import cx from "classnames";
import Countdown from "../components/countdown";
import TableOfContents from "../components/table-of-contents";
import Venue from "../components/venue";
import Hotel from "../components/hotel";
import Registry from "../components/registry";
import Rsvp from "../components/rsvp";
import Couple from "../components/couple";
import Party from "../components/party";

const Home: NextPage = () => {
    return (
        <Tray>
            <Main>
                <Header />
                <HorizontalDivider />
                <Countdown />
                <HorizontalDivider />
                <TableOfContents />
                <HorizontalDivider />
                <Venue />
                <HorizontalDivider />
                <Hotel />
                <HorizontalDivider />
                <Registry />
                <HorizontalDivider />
                <Rsvp />
                <HorizontalDivider />
                <Couple />
                <HorizontalDivider />
                <Party />
                <Footer />
            </Main>
        </Tray>
    );
};

export default Home;

const Header = () => (
    <span
        className={cx(
            "block text-center mb-5",
            "font-wizard-hand text-8xl leading-normal",
            "md:text-9xl md:leading-normal"
        )}
    >
        Megan &amp; Jake
    </span>
);

const Footer = () => (
    <div className={cx("block text-center pt-16 pb-4", "text-sm")}>
        <span>
            Created by Jake Chitel &copy; 2022 |{" "}
            <a
                href="https://github.com/jchitel/wedding-site"
                target="_blank"
                rel="noreferrer"
                className="underline active:underline visited:underline hover:underline"
            >
                Source Code
            </a>
        </span>
    </div>
);

const Tray = ({ children }: { children: React.ReactNode }) => (
    <div
        className={cx(
            "bg-marauders-map bg-[length:100%]",
            "font-parchment-print",
            "w-full min-h-full",
            "text-primary"
        )}
    >
        {children}
    </div>
);

const Main = ({ children }: { children: React.ReactNode }) => (
    <div
        className={cx(
            "bg-marauders-map bg-[length:100%]",
            "max-w-[900px] min-h-full m-auto",
            "shadow-[-20px_0_20px_10px_rgba(0,0,0,0.75),20px_0_20px_10px_rgba(0,0,0,0.75)]"
        )}
    >
        {children}
    </div>
);

const HorizontalDivider = () => (
    <hr className="w-4/5 mx-auto my-2 border-primary border-2 border-t-0" />
);
