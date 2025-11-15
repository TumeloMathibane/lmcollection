export default function Card({ cardTitle, cardContent, cardSmallText }: { cardTitle: string; cardContent: string; cardSmallText?: string }) {
    return <>
        <h1 className="text-2xl text-stone-900 font-bold">{cardTitle}</h1>
        <p className="flex-1">{cardContent}</p>
        <p className="text-xs text-stone-400 font-medium">{cardSmallText}</p>
    </>;
}