import React, { useState } from "react";
import { useCms, ADMIN_PASSWORD } from "@/lib/cms";
import { Lock, LogOut, Pencil, Eye, RotateCcw, Settings, X } from "lucide-react";

export function AdminBar() {
  const { isAdmin, editMode, login, logout, setEditMode, reset } = useCms();
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pw)) { setShowLogin(false); setPw(""); setErr(""); setEditMode(true); }
    else setErr("Wrong password");
  };

  if (!isAdmin) {
    return (
      <>
        <button
          onClick={() => setShowLogin(true)}
          className="fixed bottom-5 right-5 z-[150] bg-gray-900/85 hover:bg-gray-900 text-white rounded-full p-3 shadow-2xl backdrop-blur-sm"
          title="Admin login"
          aria-label="Admin login"
        >
          <Lock className="w-4 h-4" />
        </button>
        {showLogin && (
          <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4" onClick={() => setShowLogin(false)}>
            <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Lock className="w-4 h-4" /> Admin Login</h3>
                <button type="button" onClick={() => setShowLogin(false)} className="text-gray-500"><X className="w-5 h-5" /></button>
              </div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <input
                type="password" autoFocus value={pw}
                onChange={(e) => { setPw(e.target.value); setErr(""); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
                placeholder="Enter password"
              />
              {err && <div className="text-xs text-red-600 mb-2">{err}</div>}
              <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg font-semibold text-sm">
                Sign In
              </button>
            </form>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-[150] flex flex-col items-end gap-2">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-64 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div className="font-bold text-gray-900 text-sm flex items-center gap-2"><Settings className="w-4 h-4" /> Admin Panel</div>
            <button onClick={() => setOpen(false)} className="text-gray-500"><X className="w-4 h-4" /></button>
          </div>
          <div className="space-y-2 text-sm">
            <button onClick={() => setEditMode(!editMode)}
              className={`w-full px-3 py-2 rounded-lg font-semibold flex items-center gap-2 ${editMode ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}>
              {editMode ? <><Eye className="w-4 h-4" /> Exit Edit Mode</> : <><Pencil className="w-4 h-4" /> Enter Edit Mode</>}
            </button>
            <button onClick={() => { if (confirm("Reset all content to defaults? This cannot be undone.")) reset(); }}
              className="w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Reset Content
            </button>
            <button onClick={() => { logout(); setOpen(false); }}
              className="w-full px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-semibold flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
          <div className="mt-3 text-[10px] text-gray-400 leading-snug">
            Tip: in edit mode, click any text to edit, click "Change" on images to swap them. Changes save automatically.
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        className={`rounded-full px-4 py-2.5 shadow-2xl text-white font-semibold flex items-center gap-2 text-sm ${editMode ? "bg-amber-500 hover:bg-amber-600" : "bg-brand-700 hover:bg-brand-800"}`}
      >
        {editMode ? <><Pencil className="w-4 h-4" /> Editing</> : <><Settings className="w-4 h-4" /> Admin</>}
      </button>
    </div>
  );
}
