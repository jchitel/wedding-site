export default function Rsvp() {
    return (
        <>
            <span
                id="rsvp"
                className="block text-center text-6xl leading-normal"
            >
                RSVP
            </span>
            <RsvpInfo>
                As of May 31, 2018, we have closed our RSVP system to any
                updates.
            </RsvpInfo>
            <RsvpInfo>
                As of June 23, 2018, we are married, and it is temporally
                impossible to RSVP to our wedding. Cheers!
            </RsvpInfo>
        </>
    );
}

const RsvpInfo = ({ children }: { children: React.ReactNode }) => (
    <p className="px-[5%] md:px-20 text-base mb-4">{children}</p>
);
