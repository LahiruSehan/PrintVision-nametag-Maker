
import React from 'react';
import { TagData, ThemeMode } from '../types';
import { GRAYSCALE_COLORS } from '../constants';

interface NameTagProps {
  data: TagData;
  subjectName: string;
  isPreview?: boolean;
}

const NameTag: React.FC<NameTagProps> = ({ data, subjectName, isPreview = false }) => {
  const activeColors = data.mode === ThemeMode.GRAYSCALE ? GRAYSCALE_COLORS : data.colors;

  return (
    <div 
      className={`relative overflow-hidden border-4 flex flex-col p-2 text-center transition-all bg-white`}
      style={{
        width: '3.5in',
        height: '2in',
        backgroundColor: activeColors.background,
        borderColor: activeColors.border,
        boxSizing: 'border-box'
      }}
    >
      {/* 1. School Logo & Name (Top, subtle) */}
      <div className="flex items-center justify-center gap-2 h-10 border-b border-dashed mb-1" style={{ borderColor: `${activeColors.border}40` }}>
        {data.schoolLogo && (
          <img 
            src={data.schoolLogo} 
            alt="Logo" 
            className="w-8 h-8 object-contain"
            style={{ filter: data.mode === ThemeMode.GRAYSCALE ? 'grayscale(100%)' : 'none' }}
          />
        )}
        <h2 
          className="text-[10px] font-bold uppercase tracking-tight leading-tight flex-1"
          style={{ color: activeColors.schoolName }}
        >
          {data.schoolName || "School Name"}
        </h2>
      </div>

      {/* 2. Student Name (First & Bigger) */}
      <div className="flex-1 flex flex-col justify-center items-center py-1">
        <h1 
          className="text-2xl font-black uppercase tracking-normal leading-tight w-full break-words"
          style={{ color: activeColors.studentName }}
        >
          {data.studentName || "Student Name"}
        </h1>
      </div>

      {/* 3. Grade (Middle, a little bigger) */}
      <div className="py-1">
        <p 
          className="text-lg font-bold uppercase tracking-widest opacity-90"
          style={{ color: activeColors.grade }}
        >
           {data.grade ? `Grade ${data.grade}` : "Grade"}
        </p>
      </div>

      {/* 4. Subject (Bottom, also bigger) */}
      <div className="mt-auto pt-1 border-t-2" style={{ borderColor: activeColors.border }}>
        <p 
          className="text-xl font-extrabold uppercase tracking-widest leading-none"
          style={{ color: activeColors.subject }}
        >
          {subjectName}
        </p>
      </div>

      {/* Aesthetic Accents */}
      <div 
        className="absolute top-0 right-0 w-6 h-6 opacity-10"
        style={{ 
          background: `linear-gradient(135deg, transparent 50%, ${activeColors.border} 50%)`
        }}
      />
    </div>
  );
};

export default NameTag;
