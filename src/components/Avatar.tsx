import Image from 'next/image';
import { useState } from 'react';

const ImageStatus = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
} as const;

type ImageStatusKeys = keyof typeof ImageStatus;
type ImageStatusValues = typeof ImageStatus[ImageStatusKeys];

const Avatar = ({
  avatarUrl,
  updatedAt,
  firstName,
  lastName,
  size = 32,
}: {
  avatarUrl?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  size?: number;
}) => {
  const [imageStatus, setImageStatus] = useState<ImageStatusValues>(
    ImageStatus.LOADING
  );

  const imageSrc = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET_NAME}/${avatarUrl}`;

  return (
    <div
      title={`${firstName} ${lastName}`}
      className={`relative flex h-${size / 4} w-${size / 4} ${
        size / 4
      } items-center justify-center overflow-hidden rounded-full  text-xs text-gray-500`}
    >
      {avatarUrl && imageStatus !== ImageStatus.ERROR ? (
        <Image
          width={size}
          height={size}
          src={imageSrc}
          className={` focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 ${
            imageStatus === ImageStatus.LOADED ? 'opacity-100' : 'opacity-0'
          }`}
          alt={`Avatar of ${firstName} ${lastName}`}
          onLoad={() => {
            setImageStatus(ImageStatus.LOADED);
          }}
          onError={() => {
            setImageStatus(ImageStatus.ERROR);
          }}
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
