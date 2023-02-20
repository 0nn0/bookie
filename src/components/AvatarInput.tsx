import React, { useState } from 'react';

import { Database } from '@/lib/database.types';

import Avatar from './Avatar';
import FormLabel from './ui/FormLabel';

type Base64 = string | ArrayBuffer | null;

function AvatarInput({
  url,
  onUpload,
}: {
  url: string;
  onUpload: (file: File) => void;
}) {
  const [base64Preview, setBase64Preview] = useState<Base64 | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    setUploading(true);

    const file = event.target.files[0];
    const base64Preview = await toBase64(file);
    setBase64Preview(base64Preview);

    setUploading(false);
    onUpload(file);
  };

  return (
    <>
      <FormLabel>Avatar</FormLabel>
      <div className="mt-2 flex items-center">
        {base64Preview ? (
          <img className="h-8 w-8 rounded-full" src={base64Preview} />
        ) : (
          <Avatar avatarUrl={url} size={32} />
        )}
        <div>
          <label
            className="ml-5 cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            htmlFor="single"
          >
            {uploading ? 'Uploading ...' : 'Change'}
          </label>
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute',
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      </div>
    </>
  );
}

export default AvatarInput;

function toBase64(file: File): Promise<Base64> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
