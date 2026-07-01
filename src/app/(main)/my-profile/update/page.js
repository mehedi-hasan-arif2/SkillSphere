"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSession, authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({ name: "", photoUrl: "" });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || "", photoUrl: user.image || "" });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await authClient.updateUser({
      name: formData.name,
      image: formData.photoUrl,
    });

    if (error) {
      toast.error(error.message || "Update failed");
    } else {
      toast.success("Profile Updated Successfully!");
      router.push('/my-profile');
      router.refresh();
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-white pt-24 text-center text-sm">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-6 pt-24">
      <form onSubmit={handleUpdate} className="w-full max-w-md bg-[#111625] p-8 rounded-2xl border border-gray-800 space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white">🛠️ Update Information</h2>
          <p className="text-xs text-gray-400 mt-1">Modify your profile fields directly into the database.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="New Name" 
            className="w-full p-3 rounded-xl bg-[#0b0f19] border border-gray-800 text-white text-sm focus:outline-none focus:border-cyan-500" 
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Profile Image URL</label>
          <input 
            type="url" 
            value={formData.photoUrl}
            onChange={(e) => setFormData({...formData, photoUrl: e.target.value})}
            placeholder="New Photo URL" 
            className="w-full p-3 rounded-xl bg-[#0b0f19] border border-gray-800 text-white text-sm focus:outline-none focus:border-cyan-500" 
          />
        </div>

        <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-600 to-violet-600 rounded-xl font-bold text-white text-sm transition active:scale-95">
          Update Information
        </button>
      </form>
    </main>
  );
}