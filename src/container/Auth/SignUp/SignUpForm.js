import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';
import {TextField} from '@material-ui/core'
const SignUpForm = () => {

  const {userid, setUserid} = useState('')
  const {password, setPassword} = useState('')
  const {username, setUsername} = useState('')
  const {email, setEmail} = useState('')
  const {gender, setGender} = useState('')
  const {birthday, setBirthday} = useState('')
  const {phoneNumber, setPhoneNumber} = useState('')
  const {preferGenre, setPreferGenre} = useState('')

 /* Original Form */ 
  const { signUp, loggedIn } = useContext(AuthContext);

 
  const { control, watch, errors, handleSubmit, confirmPassword }  = {}

  return (
    <>
      <div>
          <label>User ID</label>
          <TextField name="userid" required /><br/>
          <label>Name</label>
          <TextField name="username" required />
        </div>
        <div>
          <label>Email Address</label>
          <TextField name="email" required />
        </div>
        <div>
          <label>Password</label>
          <TextField name="password"/>
        </div>
        <div>
          <label>Birthday</label>
          <TextField name="birthday"/>
        </div>
        <button type="submit">Sign Up</button>
      </>
  );
};

export default SignUpForm;