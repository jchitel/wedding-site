import Image, { StaticImageData } from "next/image";
import targetImage from "../images/target.png";
import bbbImage from "../images/bedbathbeyond.png";
import amazonImage from "../images/amazon.png";

const targetLink =
    "https://www.target.com/gift-registry/giftgiver?registryId=32f2a8d63aa1458e82149d8abd922ebd&type=WEDDING";
const bbbLink =
    "https://www.bedbathandbeyond.com/store/giftregistry/view_registry_guest.jsp?eventType=Wedding&registryId=545402352";
const amazonLink =
    "https://www.amazon.com/wedding/jake-chitel-megan-heim-milwaukee-june-2018/registry/1PNJF2X8JJ9C1";

export default function Registry() {
    return (
        <>
            <span
                id="registry"
                className="block text-center text-6xl leading-normal"
            >
                Registries
            </span>
            <div className="flex justify-around content-center max-h-[300px]">
                <RegistryLink
                    url={targetLink}
                    image={targetImage}
                    alt="Target"
                />
                <div className="border border-primary" />
                <RegistryLink
                    url={bbbLink}
                    image={bbbImage}
                    alt="Bed Bath &amp; Beyond"
                />
                <div className="border border-primary" />
                <RegistryLink
                    url={amazonLink}
                    image={amazonImage}
                    alt="Amazon"
                />
            </div>
        </>
    );
}

const RegistryLink = ({
    url,
    image,
    alt,
}: {
    url: string;
    image: StaticImageData;
    alt: string;
}) => (
    <a href={url} target="_blank" className="w-[30%]" rel="noreferrer">
        <Image className="w-full" src={image} alt={alt} />
    </a>
);
