import Image from "next/image";
import { useState } from "react";
import gesuImage from "../images/gesu.jpg";
import mamImage from "../images/mam.jpg";

export default function Venue() {
    const [googleMapsHeight, setGoogleMapsHeight] = useState(0);
    const [googleMapsWidth, setGoogleMapsWidth] = useState(0);

    const setGoogleSize = (event: React.SyntheticEvent<HTMLImageElement>) => {
        setGoogleMapsHeight(
            event.currentTarget.getBoundingClientRect().height | 0
        );
        setGoogleMapsWidth(
            ((event.currentTarget.getBoundingClientRect().width * 3) / 2) | 0
        );
    };

    const googleMapsUrl =
        `https://maps.googleapis.com/maps/api/staticmap` +
        `?size=${googleMapsWidth}x${googleMapsHeight}` +
        `&key=AIzaSyCB7uuMVKZcFx1fKpp6cpSoOlYBRnLG88o` +
        `&markers=label%3AG%7CChurch%20of%20the%20Gesu` +
        `&markers=label%3AP%7C43.0378191%2C-87.9270358`;

    return (
        <>
            <VenueInfo
                id="venue"
                header="Ceremony"
                venueUrl="http://www.gesuparish.org/"
                venueName="Church of the Gesu"
                venueAddress="1145 W Wisconsin Ave, Milwaukee, WI 53233"
            >
                <div className="w-4/5 m-auto flex justify-between">
                    <div className="w-2/5">
                        <Image
                            className="w-full h-auto"
                            onLoad={setGoogleSize}
                            src={gesuImage}
                            alt="Church of the Gesu"
                        />
                    </div>
                    {googleMapsHeight && googleMapsWidth && (
                        <Image
                            src={googleMapsUrl}
                            alt="Church location on Google Maps"
                        />
                    )}
                </div>
                <span className="block text-center text-sm">
                    Parking is available in Lot J behind the church, accessible
                    via 11th St. Additional parking is available on nearby
                    streets.
                </span>
            </VenueInfo>

            <VenueInfo
                header="Reception"
                venueUrl="https://mam.org/"
                venueName="Milwaukee Art Museum"
                venueAddress="700 N Art Museum Dr, Milwaukee, WI 53202"
            >
                <div className="w-4/5 block m-auto">
                    <Image src={mamImage} alt="Milwaukee Art Museum" />
                </div>
            </VenueInfo>
        </>
    );
}

const VenueInfo = ({
    id,
    header,
    venueUrl,
    venueName,
    venueAddress,
    children,
}: {
    id?: string;
    header: string;
    venueUrl: string;
    venueName: string;
    venueAddress: string;
    children: React.ReactNode;
}) => (
    <>
        <span id={id} className="block text-center text-6xl leading-normal">
            {header}
        </span>
        <span className="block text-center text-4xl leading-normal">
            <a
                href={venueUrl}
                target="_blank"
                rel="noreferrer"
                className="underline active:underline visited:underline hover:underline"
            >
                {venueName}
            </a>
        </span>
        <span className="block text-center text-xl mb-3">{venueAddress}</span>
        {children}
    </>
);
