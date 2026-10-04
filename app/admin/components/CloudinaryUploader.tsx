"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, CheckCircle, Image as ImageIcon } from "lucide-react";

interface CloudinaryUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  placeholder?: string;
}

export default function CloudinaryUploader({
  value,
  onChange,
  folder = "flysky",
  label = "Upload Image",
  placeholder = "https://...",
}: CloudinaryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [directUrl, setDirectUrl] = useState(value || "");
  const [mode, setMode] = useState<"file" | "url">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setError("File size must be under 8MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
      setDirectUrl(data.url);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image to Cloudinary");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <div className="flex items-center space-x-1 text-xs">
          <button
            type="button"
            onClick={() => setMode("file")}
            className={`px-2 py-0.5 transition-colors ${mode === "file"
                ? "bg-[#991b1b] text-white font-medium"
                : "text-slate-500 hover:text-slate-800"
              }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 transition-colors ${mode === "url"
                ? "bg-[#991b1b] text-white font-medium"
                : "text-slate-500 hover:text-slate-800"
              }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {mode === "file" ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed transition-all p-4 text-center cursor-pointer ${uploading
              ? "border-[#dc2626] bg-[#dc2626]/5"
              : "border-slate-300 hover:border-[#991b1b] bg-slate-50"
            }`}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          {uploading ? (
            <div className="flex flex-col items-center justify-center py-4 text-[#dc2626]">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <p className="text-xs font-semibold">Uploading to Cloudinary CDN...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-2 text-slate-600">
              <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                Click to browse or drag & drop image here
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                PNG, JPG, WEBP, AVIF up to 8MB (Cloudinary auto-optimized)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={directUrl}
            onChange={(e) => {
              setDirectUrl(e.target.value);
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b] bg-white"
          />
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600 font-medium bg-red-50 p-2 border border-red-200">
          {error}
        </p>
      )}

      {/* Preview Card */}
      {value && (
        <div className="relative mt-2 border border-slate-200 bg-white p-2 flex items-center space-x-3">
          <div className="relative w-16 h-12 bg-slate-100 flex-shrink-0 border border-slate-200 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-800 truncate">{value}</p>
            <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 font-semibold mt-1">
              <CheckCircle className="w-3 h-3 mr-1" /> Active Image
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              setDirectUrl("");
            }}
            className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
