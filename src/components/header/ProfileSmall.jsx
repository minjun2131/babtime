import React from 'react';
import styled from 'styled-components';

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  background-image: ${(props) => (props.profileImage ? `url(${props.profileImage})` : `url('../../images/user.svg')`)};
`;

const ProfileSmall = ({ profileImage }) => {
  return <ProfileImage profileImage={profileImage}></ProfileImage>;
};

export default ProfileSmall;
