import React, { ChangeEvent } from 'react';
import axios from 'axios';
import { Button, Input, Row, Col, message } from 'antd';
import dotenv from 'dotenv';
import AxiosApi from '../interface';

// dotenv.config();

// const api: AxiosApi = {}
// 로그인 , 회원가입 로그인 구분자로 분기되는 컴포넌트
const Auth = () => {
  const [id, setId] = React.useState<string>('');
  const [pwd, setPwd] = React.useState<string>('');
  const [nickName, setNickName] = React.useState<string>('');
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false); //로그인 유무로 화면 분기 state
  const [messageApi] = message.useMessage();

  const warning = (msg: string) => {
    messageApi.open({
      type: 'warning',
      content: msg
    });
  };

  // 아이디 인풋 핸들러
  const handleIdOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setId(value);
  };

  //   비밀번호 인풋 핸들러
  const handlePwdOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPwd(value);
  };
  //   비밀번호 인풋 핸들러
  const handleNickNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickName(value);
  };

  //로그인, 회원가입 onclick button
  const handleAuthOnclick = () => {
    const params = { userId: id, password: pwd };
    axios.post('http://52.79.226.246/auth/signin', params).then((response) => {
      console.log(response.request);

      console.log(response.request.status);
      if (response.request.status) {
        const { status } = response.request;

        if (status === 400) {
          const { data } = response;
          console.log(data.message);

          warning(data.message);
        } else {
        }
      }
    });
  };

  const handleSignOnclick = () => {
    // 회원가입 로그인 분기처리
    if (isSignUp === false) {
      setIsSignUp(true);
      setId('');
      setPwd('');
      setNickName('');
    } else {
      setIsSignUp(false);
      setId('');
      setPwd('');
      setNickName('');
    }
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Row>
            <Col>id</Col>
            <Input onChange={handleIdOnChange} value={id} />
          </Row>
          <Row>
            <Col>password</Col>
            <Input onChange={handlePwdOnChange} value={pwd} />
          </Row>
          {isSignUp ? (
            <>
              <Col>nickName</Col>
              <Input onChange={handleNickNameOnChange} value={nickName} />
            </>
          ) : null}

          <Row>
            <Col span={24}>
              <Button type='primary' onClick={handleAuthOnclick}>
                {isSignUp ? '회원가입' : '로그인'}
              </Button>
            </Col>
          </Row>
          <Row>
            {' '}
            <Button type='primary' onClick={handleSignOnclick}>
              {isSignUp ? '로그인 하러가기' : '회원가입 하러가기'}
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Auth;
