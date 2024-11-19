import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (title?: string): Promise<Song[]> => { // Pass title as a parameter
  const supabase = createServerComponentClient({ cookies });

  if (!title) { // Check if title is undefined or empty
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`) // Use title safely
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
  }

  return (data as Song[]) || [];
};

export default getSongsByTitle;
