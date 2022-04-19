export default function TableOfContents() {
    return (
        <>
            <span className="mx-auto text-center text-3xl leading-normal w-3/5 flex flex-wrap justify-around">
                <TableOfContentsLink label="Venue" href="#venue" />
                <TableOfContentsLink label="Hotel" href="#hotel" />
                <TableOfContentsLink label="Registries" href="#registry" />
                <TableOfContentsLink label="RSVP" href="#rsvp" />
                <TableOfContentsLink label="Bride &amp; Groom" href="#couple" />
                <TableOfContentsLink label="Wedding Party" href="#party" />
            </span>
        </>
    );
}

const TableOfContentsLink = ({
    label,
    href,
}: {
    label: string;
    href: string;
}) => (
    <a
        className="no-underline active:no-underline visited:no-underline hover:underline px-1"
        href={href}
    >
        {label}
    </a>
);
