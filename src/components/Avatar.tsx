import Image from 'next/image';

const Avatar = ({
  avatarUrl,
  firstName,
  lastName,
  size = 32,
}: {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  size?: number;
}) => {
  return (
    <div
      title={`${firstName} ${lastName}`}
      className={`relative flex h-${size / 4} w-${size / 4} ${
        size / 4
      } items-center justify-center overflow-hidden rounded-full  text-xs text-gray-500`}
    >
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET_NAME}/${avatarUrl}`}
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          alt={`Avatar of ${firstName} ${lastName}`}
        />
      ) : (
        <svg viewBox="0 0 32 32" className="absolute h-full w-full">
          <rect x={0} y={0} width={32} height={32} className="fill-slate-300" />
          <text
            className="fill-slate-800 text-xs font-semibold"
            x="16"
            y="16"
            textAnchor="middle"
            alignmentBaseline="central"
          >
            {firstName && firstName[0]}
            {lastName && lastName[0]}
          </text>
        </svg>
      )}
    </div>
  );
};

export default Avatar;
