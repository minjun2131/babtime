import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileSmall from './ProfileSmall';
import { HeaderRightDiv, ButtonPrimary } from '../../styles/HeaderStyle.jsx';
import { supabase } from '../../services/supabase';

const HeaderRight = ({ loginUser }) => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (loginUser) {
        const { data, error } = await supabase
          .from('users')
          .select('profile_image_url')
          .eq('id', loginUser.id)
          .single();

        if (error) {
          console.error('프로필 이미지를 가져오는 데 오류가 발생했습니다:', error);
        } else {
          setProfileImage(data.profile_image_url);
        }
      }
    };

    fetchProfileImage();
  }, [loginUser]);

  return (
    <HeaderRightDiv>
      {loginUser ? (
        <>
          <Link to={`/postEdit`}>
            <ButtonPrimary>새 글 작성</ButtonPrimary>
          </Link>
          <Link to={`/myPage/${loginUser.id}`}>
            <ProfileSmall profileImage={profileImage} />
          </Link>
        </>
      ) : (
        <>
          <Link to={`/login`}>Login</Link>
          <Link to={`/signUp`}>Sign Up</Link>
        </>
      )}
    </HeaderRightDiv>
  );
};

export default HeaderRight;
