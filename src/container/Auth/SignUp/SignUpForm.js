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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [preferGenre, setPreferGenre] = useState('')

  const register = e => {
    e.preventDefault()
    axios({
      url: `http://localhost:8080/users`,
      method: 'post',
      headers: {'Content-Type': 'application/json', 'Authorization' : 'JWT fefege..'},
      data: {username, password, name, email, gender, birthday, phoneNumber, preferGenre}
    })
      .then(resp => {
      alert('회원가입 성공'+resp.data)
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
        <Input
            onChange = {e => {setUsername(`${e.target.value}`)}}
          id="username" 
          name="username"
          defaultValue=""
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl
        label="비밀번호"
      >
        <Input
            onChange = {e => {setPassword(`${e.target.value}`)}}
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
        <Input
            onChange = {e => {setName(`${e.target.value}`)}}
          id="name" 
          name="name"
          defaultValue=""
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl
        label="이메일 주소"
      >
        <Input
            onChange = {e => {setEmail(`${e.target.value}`)}}
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
        <Input
            onChange = {e => {setGender(`${e.target.value}`)}}
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
        <Input
            onChange = {e => {setBirthday(`${e.target.value}`)}}
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
        <Input
            onChange = {e => {setPhoneNumber(`${e.target.value}`)}}
          id="phoneNumber" 
          name="phoneNumber"
          defaultValue=""
          placeholder="ex) 01012345678"
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl
        label="선호장르"
      >
        <Input
            onChange = {e => {setPreferGenre(`${e.target.value}`)}}
          id="preferGenre" 
          name="preferGenre"
          defaultValue=""
          placeholder="유화, 조각"
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FieldWrapper>
        <SwitchWrapper>
          <Input
            as={<Switch />}
            name="rememberMe"
            defaultValue={false}
            valueName="checked"
          />
          <Label>아이디 기억하기</Label>
        </SwitchWrapper>
        <SwitchWrapper>
          <Input
            as={<Switch />}
            name="termsAndConditions"
            defaultValue={false}
            valueName="checked"
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