import { supabase } from './services/supabase';

// 유저 데이터 가져오기
export const fetchUserData = async (userId) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
};

// 작성한 게시물 가져오기
export const fetchWritePosts = async (userId) => {
  const { data, error } = await supabase.from('posts').select('*').eq('user_id', userId);
  if (error) throw error;
  return data;
};

// 좋아요 게시물 가져오기
export const fetchLikedPosts = async (userId) => {
  const { data: likedPostIds, error } = await supabase.from('likes').select('post_id').eq('user_id', userId);
  if (error) throw error;

  if (likedPostIds.length > 0) {
    const { data: likedPostsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .in(
        'id',
        likedPostIds.map((like) => like.post_id)
      );
    if (postsError) throw postsError;

    const enrichedLikedPosts = await Promise.all(
      likedPostsData.map(async (post) => {
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', post.user_id)
          .single();
        if (userError) {
          console.error(`사용자 데이터 불러오기 실패 (user_id: ${post.user_id}):`, userError);
          return null;
        }
        return { ...post, userName: user.name, userId: user.id, userImage: user.profile_image_url };
      })
    );

    return enrichedLikedPosts.filter((post) => post !== null);
  } else {
    return [];
  }
};

// 유저 프로필 이미지 가져오기
export const fetchGetProfileImage = async ({ setProfileImage, paramUser }) => {
  if (paramUser) {
    const { data, error } = await supabase.from('users').select('profile_image_url').eq('id', paramUser.id).single();

    if (error) {
      console.error('프로필 이미지를 가져오는 데 오류가 발생했습니다:', error);
    } else {
      setProfileImage(data.profile_image_url);
    }
  }
};

export const fetchGetUserData = async ({ setName, setIntroduce, setProfileImage, userId }) => {
  const { data, error } = await supabase
    .from('users')
    .select('name, introduce, profile_image_url')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user data:', error);
  } else {
    setName(data.name || ''); // 이름 데이터 설정
    setIntroduce(data.introduce || ''); // 소개 데이터 설정
    setProfileImage(data.profile_image_url || ''); // 이미지 파일 주소 설정
  }
};

export const fetchUpdateUserData = async ({ userId, name, introduce, uploadedUrl }) => {
  try {
    // 유저 데이터 업데이트
    const { data, error } = await supabase
      .from('users')
      .update({
        name, // 닉네임 업데이트
        introduce, // 자기소개 업데이트
        profile_image_url: uploadedUrl // 프로필 이미지 URL 업데이트
      })
      .eq('id', userId); // 특정 userId에 해당하는 데이터만 업데이트
    if (error) {
      console.error('Error updating user data:', error);
    } else {
      console.log('User data updated successfully');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
