import React, { useEffect, useRef, useState } from "react";
import { useCms } from "@/lib/cms";
import { Pencil, Image as ImageIcon, Upload, X } from "lucide-react";

type EProps = {
  path: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
};

export function E({ path, as = "span", className = "", multiline = false, placeholder }: EProps) {
  const { editMode, get, update } = useCms();
  const Tag: any = as;
  const value: string = get(path) ?? "";
  const ref = useRef<HTMLElement>(null);

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onBlur={(e: any) => {
        const text = multiline ? e.currentTarget.innerText : e.currentTarget.innerText.replace(/\n/g, " ");
        if (text !== value) update(path, text);
      }}
      onKeyDown={(e: any) => {
        if (!multiline && e.key === "Enter") { e.preventDefault(); e.currentTarget.blur(); }
      }}
      className={`${className} outline-none ring-2 ring-dashed ring-amber-400/70 ring-offset-2 rounded px-0.5 hover:ring-amber-500 focus:ring-amber-600 focus:bg-amber-50/70 transition`}
    >
      {value}
    </Tag>
  );
}

export function EditableImage({
  path, alt, className, imgClassName,
}: { path: string; alt?: string; className?: string; imgClassName?: string }) {
  const { editMode, get, update } = useCms();
  const src: string = get(path) ?? "";
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(src);

  useEffect(() => { setUrl(src); }, [src, open]);

  const onFile = (f: File) => {
    if (f.size > 4_000_000) {
      alert("Image too large (max 4MB). Please use a URL or smaller file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => { update(path, reader.result as string); setOpen(false); };
    reader.readAsDataURL(f);
  };

  return (
    <div className={`relative ${className || ""}`}>
      {src ? <img src={src} alt={alt || ""} className={imgClassName} loading="lazy" /> : <div className={`${imgClassName} bg-gray-200`} />}
      {editMode && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setOpen(true); }}
          className="absolute top-2 right-2 z-10 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
        >
          <ImageIcon className="w-3.5 h-3.5" /> Change
        </button>
      )}
      {open && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Change Image</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-900"><X className="w-5 h-5" /></button>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              value={url} onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 text-sm"
              placeholder="https://..."
            />
            <button
              onClick={() => { update(path, url); setOpen(false); }}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg font-semibold mb-3 text-sm"
            >Save URL</button>
            <div className="text-center text-xs text-gray-500 my-2">— or —</div>
            <label className="block w-full border-2 border-dashed border-gray-300 hover:border-brand-500 rounded-lg p-4 text-center cursor-pointer">
              <Upload className="w-5 h-5 mx-auto text-gray-500 mb-1" />
              <span className="text-sm text-gray-700">Upload from device</span>
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple inline edit pencil button — useful for triggering focus on an E nearby (decorative only).
export function EditMark() {
  const { editMode } = useCms();
  if (!editMode) return null;
  return <Pencil className="inline w-3 h-3 text-amber-500 ml-1 align-middle" />;
}
