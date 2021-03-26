import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import { LOGIN_PAGE } from 'settings/constant';
import SignUpForm from './SignUpForm';
import SocialLogin from '../SocialLogin';
import Wrapper, {
  Title,
  TitleInfo,
  Text,
  FormWrapper,
  BannerWrapper,
} from '../Auth.style';

const SignUp = () => {

  return (
    <Wrapper>
      <FormWrapper>
        <Logo
          withLink
          linkTo="/"
          src="/images/cart-logo.png"
        />
        <Title>Welcome To C:ART</Title>
        <TitleInfo>회원가입 정보를 입력해주세요</TitleInfo>
        <SignUpForm />
        <Divider>SNS로 가입하기</Divider>
        <SocialLogin />
        <Text>
          이미 회원가입이 되어있습니다! &nbsp;
          <Link to={LOGIN_PAGE}>로그인하러가기</Link>
        </Text>
      </FormWrapper>
      <BannerWrapper>
        <img src="/images/signup_page_bg.jpg" alt="Auth page banner" />
      </BannerWrapper>
    </Wrapper>
  );
};

export default SignUp;