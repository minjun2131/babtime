import { supabase } from '../services/supabase';

export const uploadProfileImage = async ({ file, userId }) => {
    if (!file || !userId) return null;

    const fileName = `profile_images/${userId}/profileImage.jpg`; // 파일 이름을 고정

    const { data, error } = await supabase.storage
        .from("profile_images") // 버킷 이름
        .upload(fileName, file, {
            cacheControl: "0",
            upsert: true, // 동일한 파일 이름이 있을 경우 덮어쓰기
        });

    if (error) {
        console.error("Error uploading file:", error);
        return null;
    }

    // 업로드한 파일의 공개 URL 가져오기
    const { data: publicUrlData, error: urlError } = supabase.storage
        .from("profile_images")
        .getPublicUrl(fileName);

    if (urlError) {
        console.error("Error getting public URL:", urlError);
        return null;
    }

    console.log("Public URL:", publicUrlData.publicUrl); // 공개 URL 확인
    return publicUrlData?.publicUrl;
};
