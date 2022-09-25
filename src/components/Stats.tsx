interface StatsProps {
  data: AnalyticEntry[];
}

export default function Stats(props: StatsProps) {
  return (
    <div className="flex flex-col justify-center">
      <div className="grid grid-cols-3 mt-4">
        <div className="p-2 font-bold">Name</div>
        <div className="p-2 font-bold">Website</div>
        <div className="p-2 font-bold">Clicks</div>
        {props.data.map((entry) => (
          <>
            <div className="p-2 border-t border-black">{entry.name}</div>
            <a
              href={`https://${entry.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-t border-black text-blue-500 hover:underline cursor-pointer active:text-blue-600"
            >
              {entry.website}
            </a>
            <div className="p-2 border-t border-black">{entry.clicks}</div>
          </>
        ))}
      </div>
    </div>
  );
}
