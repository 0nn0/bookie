export default function Avatar({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  return (
    <svg viewBox="0 0 32 32" className="absolute h-full w-full">
      <rect x={0} y={0} width={32} height={32} className="fill-slate-300" />
      <text
        className="fill-slate-800 text-xs font-semibold"
        x="16"
        y="16"
        textAnchor="middle"
        alignmentBaseline="central"
        dominantBaseline="middle"
      >
        {firstName && firstName[0]}
        {lastName && lastName[0]}
      </text>
    </svg>
  );
}
