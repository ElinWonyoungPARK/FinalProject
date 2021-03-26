import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';
import {TextField} from '@material-ui/core'

const SignUpForm = () => {
  const {control} = useForm();
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [preferGenre, setPreferGenre] = useState('')

  const register = e => {
    e.preventDefault()
    axios.post(`/users/save`, {
      userid, password, username, email, gender, birthday, phoneNumber, preferGenre,
      proxy: {
        host: 'localhost',
        port: 8080,
        protocol: 'http'
      }
    })
    .then(resp => {
      alert('회원가입 성공')
    })
    .catch(err => {
      alert('회원가입 실패')
    })
  }

  return (
    <form>
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
      <FormControl
        label="이름"
      >
        <Controller
          as={<Input
            onChange = {e => {setUsername(`${e.target.value}`)}}
          />}
          id="username" 
          name="username"
          defaultValue=""
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl
        label="이메일 주소"
      >
        <Controller
          as={<Input
            onChange = {e => {setEmail(`${e.target.value}`)}}
          />}
          id="email" 
          type="email"
          name="email"
          defaultValue=""
          placeholder="ex) saram@gmail.com"
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl
        label="성별"
      >
        <Controller
          as={<Input
            onChange = {e => {setGender(`${e.target.value}`)}}
          />}
          id="gender" 
          name="gender"
          defaultValue=""
          placeholder="남 혹은 여 라고 입력해주세요"
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl
        label="생년월일"
      >
        <Controller
          as={<Input
            onChange = {e => {setBirthday(`${e.target.value}`)}}
          />}
          id="birthday" 
          name="birthday"
          defaultValue=""
          placeholder="ex) 19960731"
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl
        label="휴대폰 번호"
      >
        <Controller
          as={<Input
            onChange = {e => {setPhoneNumber(`${e.target.value}`)}}
          />}
          id="phoneNumber" 
          name="phoneNumber"
          defaultValue=""
          placeholder="ex) 01012345678"
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FieldWrapper>
        <SwitchWrapper>
          <Controller
            as={<Switch />}
            name="rememberMe"
            defaultValue={false}
            valueName="checked"
            control={control}
          />
          <Label>아이디 기억하기</Label>
        </SwitchWrapper>
        <SwitchWrapper>
          <Controller
            as={<Switch />}
            name="termsAndConditions"
            defaultValue={false}
            valueName="checked"
            control={control}
          />
          <Label>전체 약관에 동의합니다</Label>
        </SwitchWrapper>
      </FieldWrapper>

      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
        onClick= {register}
      >
        <MdLockOpen />
        회원가입
      </Button>
    </form>
  );
};

export default SignUpForm;