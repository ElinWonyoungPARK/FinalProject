import React, { useState } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';
import { FORGET_PASSWORD_PAGE } from 'settings/constant';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';
import {TextField} from '@material-ui/core'

const SignInForm = () => {
  const {control} = useForm();
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const API_URL = "http://localhost:8080/api/users/";

  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }

  const login = (username, password) => {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  const logout = () => {
    localStorage.removeItem("user");
  }

  const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
  }
 
  return (
    <form >
      <FormControl
        label="ID"
      >
        <Controller
          as={<Input
            onChange = {e => {setUserid(`${e.target.value}`)}}
          />}
          id="userid" 
          name="userid"
          defaultValue=""
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl
        label="비밀번호"
      >
        <Controller
          as={<Input.Password 
            onChange = {e => {setPassword(`${e.target.value}`)}}
          />}
          id="password"
          name="password"
          defaultValue=""
          control={control}
          rules={{ required: true, minLength: 6, maxLength: 20 }}
        />
      </FormControl>
      <FieldWrapper>
        <SwitchWrapper>
          <Controller
            as={<Switch />}
            name="Remember Me"
            defaultValue={false}
            valueName="checked"
            control={control}
          />
          <Label>자동로그인</Label>
        </SwitchWrapper>
        <Link to={FORGET_PASSWORD_PAGE}>비밀번호 찾기</Link>
      </FieldWrapper>
      
      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
        onClick= {login}
      >
        <MdLockOpen />
        Login
      </Button>
    </form>
  );
};

export default SignInForm;