import { useEffect, useState } from "react";
import cx from "classnames";
import {
    isBefore,
    differenceInDays,
    addDays,
    differenceInHours,
    addHours,
    differenceInMinutes,
    addMinutes,
    differenceInSeconds,
} from "date-fns";

const ceremonyTime = new Date(1529782440000);

export default function Countdown() {
    const [current, setCurrent] = useState(ceremonyTime);

    useEffect(() => {
        setCurrent(new Date());
        setInterval(() => {
            setCurrent(new Date());
        }, 1000);
    }, []);

    const since = isBefore(ceremonyTime, current);
    const latter = since ? current : ceremonyTime;
    let former = since ? ceremonyTime : current;
    // date-fns has an `intervalToDuration()` that would be really useful here but unfortunately
    // the units it returns can't be customized. We want things in days but it returns years/months/days.
    // Perhaps in the second version of the site I can change the countdown format to allow for that.
    const days = differenceInDays(latter, former);
    former = addDays(former, days);
    const hours = differenceInHours(latter, former);
    former = addHours(former, hours);
    const minutes = differenceInMinutes(latter, former);
    former = addMinutes(former, minutes);
    const seconds = differenceInSeconds(latter, former);

    return (
        <>
            <CountdownContent className="space-x-2 mt-5">
                <CountdownUnit value={days} unit="Days" />
                <CountdownUnit value={hours} unit="Hours" />
                <CountdownUnit value={minutes} unit="Minutes" />
                <CountdownUnit value={seconds} unit="Seconds" />
            </CountdownContent>
            <span className="block text-center text-3xl font-parchment-print">
                {since ? "Since" : "Until"}
            </span>
            <CountdownContent>Saturday, June 23, 2018</CountdownContent>
            <CountdownContent>2:34 PM</CountdownContent>
        </>
    );
}

const CountdownUnit = ({ value, unit }: { value: number; unit: string }) => (
    <div>
        <span className="min-w-[75px]">{value}</span>
        <span>{unit}</span>
    </div>
);

const CountdownContent = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => (
    <span
        className={cx(
            className,
            "flex flex-wrap justify-around text-center px-12",
            "font-wizard-hand text-6xl leading-normal"
        )}
    >
        {children}
    </span>
);
