"use client";

import { useRouter } from "next/navigation";
import { User, ArrowRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-white pt-24 text-center text-sm">
        Loading profile metrics...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-white pt-24 text-center text-sm">
        No user found. Please log in.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#111625] border border-gray-800 p-8 rounded-2xl space-y-6 relative">
        <div className="text-center space-y-5">
          <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-cyan-500/30 bg-[#0b0f19] flex items-center justify-center">
            {user.image ? (
              <img 
                src={user.image} 
                alt="Profile" 
                className="object-cover w-full h-full" 
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <User className="text-gray-400 w-16 h-16" />
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-extrabold">{user.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
          
          <button 
            onClick={() => router.push('/my-profile/update')} 
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-violet-600 font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition"
          >
            Update Profile Information <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}