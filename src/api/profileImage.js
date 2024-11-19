import { supabase } from '../services/supabase';

export const uploadProfileImage = async ( file, userId ) => {
    if (!file || !userId) return null;

    const fileName = `${userId}/${file.name}`; // 고유한 파일 이름 설정
    const { data, error } = await supabase.storage
        .from("profile_images") // 버킷 이름
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: true, // 동일한 파일 이름이 있을 경우 덮어쓰기
        });

    if (error) {
        console.error("Error uploading file:", error);
        return null;
    }

    // 업로드한 파일의 공개 URL 가져오기
    const { data: publicUrlData } = supabase.storage
        .from("profile_images")
        .getPublicUrl(fileName);

    return publicUrlData?.publicUrl;
};

export const updateProfileImage = async ({ img_url = null, userId }) => {
    const { data, error } = await supabase
        .from("users")
        .update({ profile_image_url: img_url }) // image_url을 업데이트 한다
        .eq("id", userId); // 조건 users table의 id 값과 세션의 id 값이 일치하는 경우
    if (error) {
        console.error("Error updating profile image:", error);
        throw error;
    }

    console.log("Profile image updated:", data);
    return data;
};
