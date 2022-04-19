import Image, { StaticImageData } from "next/image";
import meganImage from "../images/megan_mellenthien.png";
import ryanImage from "../images/ryan_krol.jpg";
import sammImage from "../images/samm_snyder.jpg";
import jessImage from "../images/jess_chitel.jpg";
import allieImage from "../images/allie_snyder.jpg";
import shannonIImage from "../images/shannon_ingles.jpg";
import katieImage from "../images/katie_higgins.jpg";
import failleImage from "../images/faille_bloom.jpg";
import shannonFImage from "../images/shannon_fuller.jpg";
import mattImage from "../images/matt_wisniewski.jpg";
import robImage from "../images/rob_gries.jpeg";
import mikeImage from "../images/mike_griese.jpg";
import joeImage from "../images/joe_schwemmer.jpg";
import kevinImage from "../images/kevin_wackman.jpg";
import donovanImage from "../images/donovan_wackman.jpg";
import keldanImage from "../images/keldan_mulvey.jpg";

export default function Party() {
    return (
        <div className="w-4/5 m-auto flex justify-between flex-wrap">
            <span
                id="party"
                className="text-center text-6xl w-full leading-normal"
            >
                Wedding Party
            </span>
            <HonorProfile
                title="Maid of Honor"
                image={meganImage}
                name="Megan Mellenthien"
            >
                My name is Megan Mellenthien and I am currently living in
                Colorado pursuing a Masters in Music. I have been friends with
                Megan for 15 years. Those years have been filled with so much
                laughter and joy that there are too many memories to recount in
                such a short paragraph. Even when we went to different high
                schools and colleges, every time we saw each other we picked up
                right where we left off with that day&apos;s shenanigans. From
                playing pretend in our backyard to watching her try on a wedding
                dress, there has never been a time I doubted her sincere heart.
                We have shared many times together and I&apos;m so excited to
                share in her happiness as she marries the man of her dreams and
                prepares to share moments with him as she continues on her
                journey.
            </HonorProfile>
            <HonorProfile title="Best Man" image={ryanImage} name="Ryan Krol">
                I met the man they call Jacob Edward Chitel when he was a mere
                boy. Who would have thought kindergarten would become middle
                school to high school and then to best men? The world out there
                is unpredictable but Jake has been a rock for me through it all.
                We&apos;ve weathered storms, we&apos;ve shared blood and guts
                have been poured out on countless occasions. Yes, this man they
                call Jacob Edward Chitel may be 25 years old but to me, he is
                ageless and just like the best of wines, he is getting sweeter
                and more expensive as the years go by.
            </HonorProfile>
            <PartySection title="Bridesmaids">
                <PartyMemberProfile image={sammImage} name="Samm Snyder">
                    Hi everyone, I am Samm Snyder and I am a senior at the
                    University of Alabama, studying development of human biology
                    on the pre-med track as an aspiring surgeon. The Chitel
                    family have been very good friends with our family since we
                    were very young, and therefore they feel like family to us.
                    When Megan came into Jake&apos;s life we were soon
                    introduced to her and fell in love with her and them as a
                    couple. She soon became part of the family with all of us!
                    Through their years together we have spent so many holidays
                    and warm summer days together with many laughs and lots of
                    love. I have been so blessed that we have become so close
                    and honored that they asked me to be a part of their big
                    day.
                </PartyMemberProfile>
                <PartyMemberProfile image={jessImage} name="Jess Chitel">
                    My name is Jess and I am the sister of the groom, and soon
                    to be Megan&apos;s sister too! I am studying Kinesiology at
                    UW-Madison with the hopes of going on to become a physical
                    therapist. I am so excited to be a part of the wedding and
                    share in Jake and Megan&apos;s celebration!
                </PartyMemberProfile>
                <PartyMemberProfile image={allieImage} name="Allie Snyder">
                    My name is Allie Snyder, I am 21 years old and study
                    radiation therapy at the university of Iowa! It&apos;s a
                    pretty simple story how I know Jake and Megan. I met Jake
                    about 17 years ago because our parents are very close
                    friends that knew each other growing up. We spend a lot of
                    time together hanging out, playing volleyball, going on
                    vacations and even having thanksgiving together. The Chitels
                    were always family to us. Then I met Megan about 5 years ago
                    when Jake introduced her to us and she immediately became
                    part of the crazy Chitel/Snyder clan! We always have such a
                    great time together and I cannot wait to be a part of your
                    day! Love you guys 💜
                </PartyMemberProfile>
                <PartyMemberProfile image={shannonIImage} name="Shannon Ingles">
                    Hi! I&apos;m Shannon, a service designer in Illinois. I met
                    Megan in college at the Milwaukee Institute of Art and
                    Design, where we both majored in Industrial Design. My
                    favorite memory with Megan is when she came to visit. We sat
                    on the roof and laughed about silly things so hard we
                    couldn&apos;t breathe. I am so happy to be a part of this
                    celebration for Megan and Jake!
                </PartyMemberProfile>
                <PartyMemberProfile image={katieImage} name="Katie Higgins">
                    Hi, I&apos;m Katie and I was born and raised here in
                    Milwaukee, but went off to Green Bay for college. I got my
                    degree in English and am pretty much always reading or
                    writing something. I met Megan while we were both working
                    for Lego! It&apos;s been three years of bricks and
                    silliness. It&apos;s great to have a friend to turn to when
                    the shift gets long. We&apos;ve gotten very good at dancing
                    to the radio and communicating through highly complex stick
                    person drawings. We&apos;ve bonded over our mutual love of
                    making costume replicas and sewing or crafting all sorts of
                    other projects! We can talk concepts and fabric and exactly
                    how much glitter we really need and get a knowledgeable
                    second opinion. I&apos;m excited to see how all the design
                    ideas come together to make a wonderful wedding!
                </PartyMemberProfile>
                <PartyMemberProfile image={failleImage} name="Faille Bloom">
                    I met Megan in a mutual class my freshman year in college
                    and though we were different majors, we had several classes
                    together over the four years. In between classes, you would
                    find us playing Minecraft in the cafeteria, building castles
                    and fighting zombies. Since graduating, we have both kept in
                    touch and continued our gaming tradition with a little
                    comfort food and a good movie. I think very fondly of those
                    times and always enjoy the little break we both get to take
                    from “adulting” to just hang out :)
                </PartyMemberProfile>
                <PartyMemberProfile image={shannonFImage} name="Shannon Fuller">
                    Megan knew me before I knew me; by that I mean to say, I am
                    Megan&apos;s second cousin! Megan was a close companion
                    throughout our younger years. I found her fun and
                    fascinating even then. Her friendship made my childhood full
                    of good cheer as well as many odd stories. Throughout much
                    of high school, Megan was my confidant and friend. Megan and
                    Jake were my rock during an upsetting Junior prom, and she
                    provided me with more than I could have asked for that
                    night. Reading this, she may not realize how much her and
                    Jake&apos;s presence was comforting, but I will assure her
                    that little has meant more to me than seeing what love can
                    be. As I have gone through my own long-term relationship, I
                    have come to see her and Jake&apos;s bond as a model for
                    what love should look like. In the end, I could not be more
                    grateful for her lessons in how to love and love well. She
                    has given her wisdom even when I haven&apos;t asked, and I
                    think these are the lessons I have needed and cherished the
                    most. I could not be more grateful for Megan&apos;s
                    friendship and her presence in my life. She is my cousin;
                    but, more so, she is my friend.
                </PartyMemberProfile>
            </PartySection>
            <PartySection title="Groomsmen">
                <PartyMemberProfile image={mattImage} name="Matt Wisniewski">
                    I met Jake freshman year of high school. Through
                    all-nighters and shared interests a lifelong bond was
                    formed. I met Megan later on, and we have been fast friends
                    since. I am looking forward to many years more of good times
                    and new adventures.
                </PartyMemberProfile>
                <PartyMemberProfile image={robImage} name="Rob Gries">
                    Jake and I first met when we became partners in a Computer
                    Engineering project at Marquette University. We bonded over
                    a shared interest in Computer Science, draft beer, and
                    immature jokes. It soon became tradition that we would end a
                    long night of programming work with a game of pool at the
                    campus bar. We were both terrible at playing pool, but it
                    was fun because we would talk about anything and forget
                    about the harsh school workload. After years of hanging out
                    and programming together (we still collaborate on projects
                    to this day!), he became one of my closest friends. I am so
                    happy for Megan and Jake, and I wish them good fortune in
                    their future together!
                </PartyMemberProfile>
                <PartyMemberProfile image={mikeImage} name="Mike Griese">
                    Jake and I met in freshman year of high school. We worked
                    together on a bunch of projects, unsurprising considering we
                    had almost exactly the same classes. As we started college,
                    Jake helped me discover my interest in developing software.
                    We both embarked on the great journey to Seattle together,
                    and although we live 3000 miles apart now, we&apos;re still
                    great friends. I know whenever I return home, I&apos;ll
                    always be able to find a friend in Jake.
                </PartyMemberProfile>
                <PartyMemberProfile image={joeImage} name="Joe Schwemmer">
                    I&apos;ve known Jake since high school, where we engineered
                    and ran track together. We had a blast making a Rube
                    Goldberg machine our senior year and spending the evenings
                    playing video games. I&apos;m excited to watch Jake and
                    Megan start their life together.
                </PartyMemberProfile>
                <PartyMemberProfile image={kevinImage} name="Kevin Wackman">
                    I met Jake back in the olden days of high school. We quickly
                    built up a rapport based on our mutual interest in things
                    such as technology and not being in Spanish class. Despite
                    going to college several hours apart from each other, we
                    have remained good friends. The strong bond we formed is
                    helped by both of us finding work in areas that both utilize
                    technology and do not utilize Spanish.
                </PartyMemberProfile>
                <PartyMemberProfile image={donovanImage} name="Donovan Wackman">
                    My name&apos;s Donovan. I met Jake a couple years ago and
                    we&apos;ve been friends since. 👌 I also golf with him a
                    lot.
                </PartyMemberProfile>
                <PartyMemberProfile image={keldanImage} name="Keldan Mulvey">
                    I met Jake in engineering class early on in high school. We
                    had similar interests and got along well, and he was quickly
                    added to the group of friends I already knew from grade
                    school. We ended up going to different colleges, but
                    I&apos;d visit him at Marquette whenever I was home for
                    break, and once, he and another friend made the drive down
                    to Notre Dame for a football weekend. I live in Florida now,
                    and we see each other even less, but when we do, we
                    don&apos;t ask how the other is doing; we ask what we
                    thought about the newest Star Wars movie. Although that
                    annoys my parents who want to know what my friends are doing
                    with their lives, I think it&apos;s the mark of a strong
                    friendship.
                </PartyMemberProfile>
            </PartySection>
        </div>
    );
}

const HonorProfile = ({
    title,
    image,
    name,
    children,
}: {
    title: string;
    image: StaticImageData;
    name: string;
    children: string;
}) => (
    <PartySection title={title}>
        <div className="mx-auto">
            <Image src={image} alt={name} width={300} height={300} />
        </div>
        <NameBio name={name} bio={children} />
    </PartySection>
);

const PartyMemberProfile = ({
    image,
    name,
    children,
}: {
    image: StaticImageData;
    name: string;
    children: string;
}) => (
    <>
        <div className="mx-auto">
            <Image src={image} alt={name} width={250} height={250} />
        </div>
        <NameBio name={name} bio={children} />
    </>
);

const PartySection = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="min-w-[300px] max-w-[350px] flex flex-col">
        <span className="text-center text-5xl leading-normal">{title}</span>
        {children}
    </div>
);

const NameBio = ({ name, bio }: { name: string; bio: string }) => (
    <>
        <span className="text-center text-3xl leading-normal">{name}</span>
        <p className="text-sm">{bio}</p>
    </>
);
