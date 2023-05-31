import React, { ChangeEvent, useEffect } from "react";
import axios from "axios";
import { Button, Input, Row, Col, message } from "antd";
import "antd/dist/reset.css";
import { EnResponseType } from "../common/enType";
import { IAuthParams } from "../common/authInterface";
import api from "../config/api";
import { url } from "../common/url";

//api url

// const api: AxiosApi = {}
// 로그인 , 회원가입 로그인 구분자로 분기되는 컴포넌트
const Auth = () => {
  const [id, setId] = React.useState<string>("");
  const [pwd, setPwd] = React.useState<string>("");
  const [nickName, setNickName] = React.useState<string>("");
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false); //로그인 유무로 화면 분기 state

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

  const handleAuthOnclick = () => {
    const params: IAuthParams = { userId: id, password: pwd };
    api
      .post(url.SignIn, params)
      .then((response) => {
        const { status } = response;
        if (status === EnResponseType.success) {
          message.info("로그인 성공");
        }
      })
      .catch((error) => {
        const { status } = error.response;
        const { data } = error.response;
        if (status === EnResponseType.error) {
          const msg = data.message;
          message.error(msg);
        } else {
        }
      });
  };

  const handleSignUpOnclick = () => {
    const params: IAuthParams = {
      userId: id,
      password: pwd,
      nickname: nickName,
    };
    api
      .post(url.SignUp, params)
      .then((response) => {
        const { status } = response;
        if (status === EnResponseType.success) {
          message.info("회원가입 성공");
          handleSignOnclick(); //로그인 페이지로 전환.
        }
      })
      .catch((error) => {
        const { status } = error.response;
        const { data } = error.response;
        if (status === EnResponseType.error) {
          const msg = data.message;
          message.error(msg);
        } else {
        }
      });
  };

  const handleSignOnclick = () => {
    // 회원가입 로그인 분기처리
    if (isSignUp === false) {
      setIsSignUp(true);
      setId("");
      setPwd("");
      setNickName("");
    } else {
      setIsSignUp(false);
      setId("");
      setPwd("");
      setNickName("");
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
            {isSignUp ? (
              <Col span={24}>
                <Button type="primary" onClick={handleSignUpOnclick}>
                  {"회원가입"}
                </Button>
              </Col>
            ) : (
              <Col span={24}>
                <Button type="primary" onClick={handleAuthOnclick}>
                  {"로그인"}
                </Button>
              </Col>
            )}
          </Row>
          <Row>
            {" "}
            <Button type="primary" onClick={handleSignOnclick}>
              {isSignUp ? "로그인 하러가기" : "회원가입 하러가기"}
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Auth;
