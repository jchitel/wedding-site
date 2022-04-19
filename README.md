# Website for my 2018 wedding

This website is a [Next.js](https://nextjs.org/) app hosted in
[Vercel](https://vercel.com/).

The public site is accessible from https://www.chitelwedding2018.com
(http://chitelwedding2018.com _should_ redirect; if it doesn't,
[please file an issue](https://github.com/jchitel/wedding-site/issues/new)!).

This website is continuing to be maintained by me even after my wedding is over!
I'm trying to keep it up-to-date with the times as the web progresses into the
future. I'm sure that in 2030 this site will be using WebAssembly, VR, and a
WebTorrent-based decentralized hosting system! For now, I'll have to put up with
SSG, boring 2D content, and a conventional hosting platform...

If you'd like to see what the website originally looked like in 2018, see here!
(todo: get link)

## Legacy

Obviously, it's not 2018 anymore. I am maintaining this project because it is
the first website that I built from scratch and actually _finished_, and that
people actually _used_! I want to make sure that it still looks good as web dev
progresses into the future, while still maintaining the same content and
functionality.

When I originally built the site, I intended to leave it hosted for the
foreseeable future as a shining example of my best work. 4 years later, I loaded
the site again and was truly horrified by what I saw.

To give 25-year-old Jake some credit, there is a lot that was done right, using
solutions that are still popular today (in some cases even more popular!):

-   **React!**
-   **TypeScript!**
-   **GraphQL!**
-   **Serverless**
    -   (I did serverless by hand, while most people today do serverless via a
        platform like Vercel that does the configuration for you.)
-   **PostgreSQL**
-   **Mobile-first**
-   **Webpack**
    -   (I wouldn't use Webpack today, but at the time Parcel was the new
        hotness. I decided to do the mature thing and stick with the proven
        solution.)
-   **Monorepo**
    -   (Next.js would have negated the need for this, but this was still a
        clean solution at the time.)

However, there was plenty that was done wrong. I'll keep this brief to avoid my
tendency of embarking on an essay to defend my positions on each of these items.
The reason I went with these at the time was effectively because I simply didn't
know better, which is fine. I know better now, and I will continue to improve!

-   **Express** - I have certain opinions about Express, and at some point I
    think it would be fun to do some research and write a blog post about why
    I'm not really a fan.
-   **Skeumorphic Design** - Our wedding invites were based on the Marauder's
    Map from Harry Potter, so I thought it would be neat to make the site look
    like the Marauder's Map too. I used a parchment image for the site
    background and handwriting-like fonts. The funny thing is that even at the
    time I thought it was a bit 2005, but I did it anyway. When I fix this I'm
    going to pick a basic flat color scheme and use built-in browser fonts to
    keep things clean and simple.
-   **Just... Bad Design** - Design has never been my strong-suit, but I
    white-knuckled my way through it. The result was passable, but far from
    professional. I should have put aside my pride and just used a template.
    Today, I have things like Tailwind UI and Refactoring UI to make these sorts
    of things easier for me, but obviously those didn't exist back then.
-   **Less?** - So I chose to use Less for styling. This is a funny/interesting
    story so I'll go into more detail here. At the time I was annoyed that we
    still used a preprocessor at my employer, when all the _cool kids_ were
    using CSS-in-JS, the new hotness for styling in React. I started this
    project using vanilla CSS-in-JS via the `style` attribute, but discovered
    pretty quickly that that pattern is actually pretty gnarly to maintain. I
    then tried to use a CSS-in-JS framework like styled-components or emotion
    instead, but I was unsatisfied with all of the available solutions at the
    time, so I bit the bullet and just went with regular CSS. However, I
    couldn't just use regular vanilla CSS either. "This isn't 2010," I told
    myself. "I have to distinguish this as modern _somehow_." So I decided I
    _had_ to have CSS modules. Unfortunately Webpack support for CSS modules has
    always been kinda trash, so after much frustration I ended up deciding to
    use CSS module support provided by a preprocessor. I picked Less instead of
    Sass out of spite, but at face value, I had landed right back where I
    started... React really threw a wrench in how people do styling, and it took
    a long time for the dust to settle and for a proper set of solutions to
    emerge. Today, a lot of people still swear by CSS-in-JS solutions, but I
    have drunk the Tailwind kool-aid and I _will_ die on this hill.

See the old README [here](./README.old.md)!
