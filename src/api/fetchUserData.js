import { supabase } from '../services/supabase';

export const fetchUserData = async ({setName, setIntroduce, userId}) => {
    const { data, error } = await supabase
        .from("users")
        .select("name, introduce")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching user data:", error);
    } else {
        setName(data.name || ""); // 이름 데이터 설정
        setIntroduce(data.introduce || ""); // 소개 데이터 설정
    }
};