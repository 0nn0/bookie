import Image from 'next/image';

const Avatar = ({
  avatarUrl,
  firstName,
  lastName,
  size = 32,
}: {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
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
      ) : firstName ? (
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
      ) : (
        <span className="bg-gray-100">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}
    </div>
  );
};

export default Avatar;
