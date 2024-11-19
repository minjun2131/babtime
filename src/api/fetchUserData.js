import { supabase } from '../services/supabase';

export const fetchGetUserData = async ({ setName, setIntroduce, setProfileImage, userId }) => {
    const { data, error } = await supabase
        .from("users")
        .select("name, introduce, profile_image_url")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching user data:", error);
    } else {
        setName(data.name || ""); // 이름 데이터 설정
        setIntroduce(data.introduce || ""); // 소개 데이터 설정
        setProfileImage(data.profile_image_url || "") // 이미지 파일 주소 설정
    }
};

export const fetchUpdateUserData = async ({ userId, name, introduce, uploadedUrl }) => {
    try {
        // 유저 데이터 업데이트
        const { data, error } = await supabase
            .from("users")
            .update({
                name,              // 닉네임 업데이트
                introduce,         // 자기소개 업데이트
                profile_image_url: uploadedUrl, // 프로필 이미지 URL 업데이트
            })
            .eq("id", userId);    // 특정 userId에 해당하는 데이터만 업데이트
        if (error) {
            console.error("Error updating user data:", error);
        } else {
            console.log("User data updated successfully:", data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

