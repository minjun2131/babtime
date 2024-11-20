import { supabase } from './services/supabase';

export const uploadProfileImage = async ({ file, userId }) => {
  if (!file || !userId) return null;

    // // 유저 폴더 내의 기존 파일을 삭제
    // const { data: existingFiles, error: listError } = await supabase.storage
    //     .from("profile_images")
    //     .list(`profile_images/${userId}`);

    // if (listError) {
    //     console.error("Error listing files:", listError);
    //     return null;
    // }

    // // 기존 파일이 있다면 삭제
    // if (existingFiles.length > 0) {
    //     for (const file of existingFiles) {
    //         const { error: removeError } = await supabase.storage
    //             .from("profile_images")
    //             .remove([file.name]);

    //         if (removeError) {
    //             console.error("Error removing file:", removeError);
    //             return null;
    //         }
    //     }
    // }

    const timestamp = Date.now(); // 현재 시간을 밀리초로 가져오기
    const fileName = `profile_images/${userId}/${timestamp}`; // 파일 이름을 고정

  const { data, error } = await supabase.storage
    .from('profile_images') // 버킷 이름
    .upload(fileName, file, {
      upsert: true // 동일한 파일 이름이 있을 경우 덮어쓰기
    });

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  // 업로드한 파일의 공개 URL 가져오기
  const { data: publicUrlData, error: urlError } = supabase.storage.from('profile_images').getPublicUrl(fileName);

  if (urlError) {
    console.error('Error getting public URL:', urlError);
    return null;
  }

  console.log('Public URL:', publicUrlData.publicUrl); // 공개 URL 확인
  return publicUrlData?.publicUrl;
};
