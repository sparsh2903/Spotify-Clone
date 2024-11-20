import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface LikedSong {
  user_id: string;
  songs: {
    id: string;
    title: string;
    author: string;
    image_path: string;
    song_path: string;
  };
}

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return [];
  }

  const { data, error } = await supabase
  .from("liked_songs")
  .select(`
    user_id,
    songs (
      id,
      title,
      author,
      image_path,
      song_path
    )
  `)

    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching liked songs:", error);
    return [];
  }

  if (!data) {
    return [];
  }

  // Map the result to the Song type
  return data.flatMap((item) => {
    const songs = Array.isArray(item.songs) ? item.songs : [item.songs];
    return songs.map((song) => ({
      id: song.id,
      user_id: item.user_id,
      author: song.author,
      title: song.title,
      image_path: song.image_path,
      song_path: song.song_path,
    }));
 });
 
  
};



export default getLikedSongs;
