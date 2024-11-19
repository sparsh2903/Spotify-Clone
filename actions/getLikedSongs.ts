import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async () => {
  const supabase = createServerComponentClient({ cookies });


  const {
    data: {
     session
    }
  } = await supabase.auth.getSession();


  const { data, error } = await supabase
  .from('liked_songs')
  .select(`
    created_at,
    user_id,
    song_id,
    songs (id, title, author, image_path)
  `)
  .eq('user_id', session?.user?.id)
  .order('created_at', { ascending: false });


  if (error) {
    console.error(error);
    return [];
  }

  if (!data) {
    return[];
  }


  return data.map((item) => ({
    ...item.songs
  }))
};

  

export default getLikedSongs;
