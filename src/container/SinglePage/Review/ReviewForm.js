import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Input, Rate, Checkbox, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import RadioGroup from 'components/UI/RadioGroup/RadioGroup';
import DragAndDropUploader from 'components/UI/ImageUploader/DragAndDropUploader';
import { Form, Label, GroupTitle, Description } from './Review.style';

const ReviewForm = () => {
  const { control, register, errors, setValue, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      reviewPhotos: [
        {
          uid: '1',
          name: 'hotel-1.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '2',
          name: 'hotel-2.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '3',
          name: 'hotel-3.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    },
  });
  useEffect(() => {
    register({ name: 'reviewPhotos' });
  }, [register]);
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        label="별점"
        htmlFor="ratings"
        error={errors.ratings && <span>This field is required!</span>}
      >
        <Controller
          as={<Rate />}
          id="ratings"
          name="ratings"
          defaultValue=""
          control={control}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl
        label="제목"
        htmlFor="reviewTitle"
        error={errors.reviewTitle && <span>This field is required!</span>}
      >
        <Controller
          as={<Input />}
          id="reviewTitle"
          name="reviewTitle"
          defaultValue=""
          control={control}
          placeholder="전시회 제목을 입력해주세요"
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl
        label="내용"
        htmlFor="reviewDetails"
        error={errors.reviewDetails && <span>This field is required!</span>}
      >
        <Controller
          as={<Input.TextArea rows={5} />}
          id="reviewDetails"
          name="reviewDetails"
          defaultValue=""
          control={control}
          placeholder="전시회는 어떠셨나요?"
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl label="사진추가 (옵션)">
        <DragAndDropUploader
          name="reviewPhotos"
          onUploadChange={(data) => setValue('사진', data)}
        />
      </FormControl>
      <FormControl>
        <Controller
          name="termsAndCondition"
          onChange={([e]) => {
            return e.target.checked;
          }}
          as={
            <Checkbox>
              게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.
              특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며 전화번호, 이메일 등의 개인정보는 
              악용될 우려가 있으므로 게시를 삼가 주시기 바랍니다.
              사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 C:ART 게시판 
              작성 권한이 제한됩니다.
            </Checkbox>
          }
          control={control}
        />
      </FormControl>
      <FormControl className="submit-container">
        <Button htmlType="submit" type="primary" size="large">
          작성 완료
        </Button>
      </FormControl>
    </Form>
  );
};

export default ReviewForm;
