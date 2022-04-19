import Image from "next/image";
import coupleImage from "../images/megan-jake.jpg";

export default function Couple() {
    return (
        <div id="couple" className="w-4/5 m-auto flex flex-col items-center">
            <span className="text-center text-6xl leading-normal pb-3">
                Bride &amp; Groom
            </span>
            <div className="w-full mb-3">
                <Image src={coupleImage} alt="The adorable wedding couple" />
            </div>
            <BioParagraph>
                Megan and Jake met at the age of 16 in June 2009 at the Rite
                Hite YMCA in northern Milwaukee, where they both trained to be
                lifeguards. If it weren&apos;t for the fact that Megan had to
                make up a class, she and Jake never would have met! When she
                stepped into the room and they met eyes for the first time, they
                had no idea what would come from that moment. The budding couple
                discovered quickly that they got along really well! Even though
                she didn&apos;t need to, Megan continued coming to Jake&apos;s
                classes just so they could spend more time together. They
                chatted online for hours at night, and though it would be some
                time before they started dating, it was clear that something
                real was growing there.
            </BioParagraph>
            <BioParagraph>
                After several months of only interacting online, Jake decided to
                ask Megan out to see a movie &ldquo;as friends&rdquo;. This led
                to their fateful first date on March 13, 2010. They continued to
                see movies together over the next few months; to this day seeing
                movies together is still one of their favorite date night
                activities! At some point, the couple had to accept the fact
                that they were dating, and they made their relationship
                official! Meanwhile, they were already making plans to
                eventually get married. A life together was now the only option
                that made sense.
            </BioParagraph>
            <BioParagraph>
                As the years went by, Megan and Jake grew together, bettering
                each other along the way. They spent as much time together as
                possible, even through their busy college years. Then, during
                Jake&apos;s last year of college, he decided that it was finally
                time to seal the commitment they had made to each other years
                before. Taking Megan completely by surprise, he proposed the
                morning of September 13, 2014, in Madison. The unsurprising{" "}
                <b>YES</b> came with tears of joy.
            </BioParagraph>
            <BioParagraph>
                The betrothed couple then set out to plan their wedding! A date
                was set for 2018, giving them time to settle into life after
                college and save up for the wedding of their dreams. This ended
                up being good forward thinking, because the next few years
                involved two cross-country moves and several job changes. But
                the couple was able to achieve their goal and get everything
                they wanted for their special day! As the date approaches, they
                are counting down the seconds, excited to profess their undying
                love for each other in front of family and friends.{" "}
                <b>We can&apos;t wait to see you there!</b>
            </BioParagraph>
        </div>
    );
}

const BioParagraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm mb-4">{children}</p>
);
