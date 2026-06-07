'use client';

import * as React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';

export default function ImageUploader({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (base64: string) => void;
  id: string;
}) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Upload Image File</label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border border-dashed border-brand-border hover:border-brand-accent/55 bg-brand-primary p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer min-h-[70px] transition-all group"
      >
        <input
          type="file"
          ref={fileInputRef}
          id={id}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {value ? (
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-brand-border bg-brand-primary">
              <Image src={value} alt="Preview" width={200} height={200} className="object-cover w-full h-full" />
            </div>
            <div className="text-left text-[11px] text-brand-muted truncate flex-1 leading-normal">
              Image loaded successfully. Click to replace.
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="text-red-400 hover:text-red-500 font-mono text-[9px] uppercase tracking-wider font-bold cursor-pointer"
            >
              Clear
            </button>
          </div>
        ) : (
          <div className="text-center group-hover:text-brand-accent transition-colors">
            <Plus className="w-4 h-4 text-brand-muted group-hover:text-brand-accent mx-auto mb-1 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#cbcbcb]">Select file or Drag here</span>
          </div>
        )}
      </div>
    </div>
  );
}
