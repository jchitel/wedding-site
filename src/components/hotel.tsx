export default function Hotel() {
    return (
        <>
            <span
                id="hotel"
                className="block text-center text-6xl leading-normal"
            >
                Hotel
            </span>
            <span className="block text-center text-4xl leading-normal">
                Fairfield Inn &amp; Suites Milwaukee Downtown
            </span>
            <span className="block text-center text-xl">
                710 N Old World Third St, Milwaukee, Wisconsin 53203
            </span>
            <span className="block text-center text-3xl leading-normal">
                <a
                    href="http://www.marriott.com/meeting-event-hotels/group-corporate-travel/groupCorp.mi?resLinkData=Heim%20%26%20Chitel%20Wedding%5Emkefd%60HEIHEIK%7CHEIHEIQ%60169.00%60USD%60false%604%606/22/18%606/24/18%606/1/18&app=resvlink&stop_mobi=yes"
                    target="_blank"
                    rel="noreferrer"
                    className="underline active:underline visited:underline hover:underline"
                >
                    Reserve your room here!
                </a>
            </span>
        </>
    );
}
