
import React, { useState, useRef } from 'react';
import { TagData, ThemeMode, Subject, SchoolPreset } from './types';
import { SRI_LANKAN_SUBJECTS, DEFAULT_COLORS, PRESET_SCHOOLS } from './constants';
import NameTag from './components/NameTag';

const App: React.FC = () => {
  const [data, setData] = useState<TagData>({
    studentName: '',
    grade: '',
    schoolName: '',
    schoolLogo: null,
    mode: ThemeMode.COLOR,
    colors: { ...DEFAULT_COLORS }
  });

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [customSubject, setCustomSubject] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      colors: { ...prev.colors, [name]: value }
    }));
  };

  const selectSchool = (school: SchoolPreset) => {
    setData(prev => ({
      ...prev,
      schoolName: school.name,
      schoolLogo: school.logo
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, schoolLogo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSubject = (name: string) => {
    if (!name.trim()) return;
    setSelectedSubjects(prev => [...prev, name.toUpperCase()]);
  };

  const addCustomSubject = () => {
    if (customSubject.trim()) {
      addSubject(customSubject);
      setCustomSubject('');
    }
  };

  const removeSubject = (index: number) => {
    setSelectedSubjects(prev => prev.filter((_, i) => i !== index));
  };

  const pageSize = 10;
  const pages = [];
  for (let i = 0; i < selectedSubjects.length; i += pageSize) {
    pages.push(selectedSubjects.slice(i, i + pageSize));
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* GLASS SIDEBAR */}
      <aside className="no-print w-full lg:w-[400px] glass border-r border-white/10 p-6 overflow-y-auto max-h-screen sticky top-0 z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h1 className="text-xl font-black text-white tracking-tighter text-center">PRINT VISION</h1>
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Name Tag Maker</p>
        </div>

        <section className="space-y-8">
          {/* Preset Schools */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Quick Select School</label>
            <div className="grid grid-cols-1 gap-2">
              {PRESET_SCHOOLS.map(school => (
                <button 
                  key={school.id}
                  onClick={() => selectSchool(school)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${data.schoolName === school.name ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <img src={school.logo} className="w-8 h-8 object-contain rounded bg-white p-0.5" alt="" />
                  <span className="text-xs font-semibold leading-tight line-clamp-2">{school.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Inputs */}
          <div className="space-y-4">
             <div className="space-y-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Details</label>
               <input 
                  type="text" 
                  name="studentName"
                  placeholder="STUDENT FULL NAME" 
                  value={data.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 font-bold"
                />
                <input 
                  type="text" 
                  name="grade"
                  placeholder="GRADE / CLASS" 
                  value={data.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 font-bold"
                />
                <div className="space-y-2">
                  <input 
                    type="text" 
                    name="schoolName"
                    placeholder="SCHOOL NAME" 
                    value={data.schoolName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 font-bold"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      Upload School Logo
                    </button>
                    {data.schoolLogo && (
                      <button 
                        onClick={() => setData(d => ({ ...d, schoolLogo: null }))}
                        className="p-2 bg-red-500/20 text-red-500 rounded-xl border border-red-500/20 hover:bg-red-500/30 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleLogoUpload} />
                </div>
             </div>
          </div>

          {/* Custom Subject */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Custom Subject</label>
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Add Subject..."
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomSubject()}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white text-sm"
              />
              <button 
                onClick={addCustomSubject}
                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="space-y-3">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Core Subjects</label>
             <div className="grid grid-cols-2 gap-2">
                {SRI_LANKAN_SUBJECTS.map(sub => (
                  <button 
                    key={sub.id}
                    onClick={() => addSubject(sub.name)}
                    className="px-3 py-2 text-[10px] font-black uppercase bg-white/5 border border-white/5 rounded-lg hover:border-blue-500 hover:bg-blue-600/20 transition-all text-slate-400 hover:text-white truncate"
                  >
                    {sub.name}
                  </button>
                ))}
             </div>
          </div>

          {/* Colors */}
          <div className="space-y-4 pt-4 border-t border-white/10">
             <div className="flex bg-white/5 p-1 rounded-xl">
               <button onClick={() => setData(d => ({ ...d, mode: ThemeMode.COLOR }))} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg ${data.mode === ThemeMode.COLOR ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}>Color</button>
               <button onClick={() => setData(d => ({ ...d, mode: ThemeMode.GRAYSCALE }))} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg ${data.mode === ThemeMode.GRAYSCALE ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500'}`}>B&W</button>
             </div>
             {data.mode === ThemeMode.COLOR && (
               <div className="grid grid-cols-3 gap-3">
                 <ColorDot label="BG" name="background" value={data.colors.background} onChange={handleColorChange} />
                 <ColorDot label="Border" name="border" value={data.colors.border} onChange={handleColorChange} />
                 <ColorDot label="Sch" name="schoolName" value={data.colors.schoolName} onChange={handleColorChange} />
                 <ColorDot label="Subj" name="subject" value={data.colors.subject} onChange={handleColorChange} />
                 <ColorDot label="Name" name="studentName" value={data.colors.studentName} onChange={handleColorChange} />
                 <ColorDot label="Grade" name="grade" value={data.colors.grade} onChange={handleColorChange} />
               </div>
             )}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button 
              onClick={handlePrint}
              disabled={selectedSubjects.length === 0}
              className="py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4" /></svg>
              Print
            </button>
            <button 
              onClick={handlePrint}
              disabled={selectedSubjects.length === 0}
              className="py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
              title="Select 'Save as PDF' in the print dialog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download
            </button>
          </div>
        </section>
      </aside>

      {/* PREVIEW AREA */}
      <main className="flex-1 p-4 lg:p-12 overflow-y-auto bg-slate-900/50">
        <div className="no-print max-w-4xl mx-auto space-y-12">
          {/* Live Dynamic Preview */}
          <div className="glass rounded-[2.5rem] p-10 flex flex-col items-center">
             <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-10">Live Visualiser</h3>
             <div className="shadow-[0_0_50px_rgba(37,99,235,0.15)] rounded overflow-hidden">
               <NameTag data={data} subjectName={selectedSubjects[selectedSubjects.length - 1] || "PREVIEW SUBJECT"} isPreview />
             </div>
             <p className="mt-8 text-slate-500 text-xs font-medium">3.5" x 2" Standard Orientation</p>
          </div>

          {/* Grid Layout Preview */}
          <div className="space-y-6">
            <div className="flex justify-between items-end px-4">
               <div>
                 <h2 className="text-2xl font-black text-white tracking-tight">Print Layout</h2>
                 <p className="text-slate-400 text-sm">Organized on A4 sheets</p>
               </div>
               <div className="flex gap-4">
                 <div className="text-right">
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tags</p>
                   <p className="text-blue-400 font-black text-xl">{selectedSubjects.length}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Pages</p>
                   <p className="text-blue-400 font-black text-xl">{pages.length}</p>
                 </div>
               </div>
            </div>

            {selectedSubjects.length === 0 && (
              <div className="h-64 glass rounded-3xl flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5">
                <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <p className="font-bold">Add subjects to start layout</p>
              </div>
            )}
          </div>
        </div>

        {/* PRINT PAGES RENDERING */}
        <div className="print-area">
          {pages.map((pageSubjects, pIdx) => (
            <div key={pIdx} className="a4-page">
              {pageSubjects.map((sub, sIdx) => {
                const globalIdx = pIdx * pageSize + sIdx;
                return (
                  <div key={globalIdx} className="relative group flex items-center justify-center">
                    <NameTag data={data} subjectName={sub} />
                    <button 
                      onClick={() => removeSubject(globalIdx)}
                      className="no-print absolute top-1 right-1 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const ColorDot: React.FC<{ label: string, name: string, value: string, onChange: any }> = ({ label, name, value, onChange }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="relative w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden shadow-inner cursor-pointer">
      <input 
        type="color" 
        name={name}
        value={value} 
        onChange={onChange}
        className="absolute inset-0 w-[150%] h-[150%] -translate-x-[10%] -translate-y-[10%] cursor-pointer border-none bg-transparent"
      />
    </div>
    <span className="text-[8px] font-black text-slate-500 uppercase">{label}</span>
  </div>
);

export default App;
