import { ImageUpload, ImagePlaceholder, ButtonGroup, Button } from '../../styles/PostEditStyle';

const ImageUploader = ({ image, onUpload, onDelete }) => (
  <ImageUpload>
    {image ? (
      <img
        src={image}
        alt="미리 보기"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          objectFit: 'cover'
        }}
      />
    ) : (
      <ImagePlaceholder>이미지를 업로드해주세요</ImagePlaceholder>
    )}
    <ButtonGroup>
      <Button onClick={() => document.getElementById('image-upload').click()}>
        {image ? '사진 변경' : '사진 등록'}
      </Button>
      <input id="image-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={onUpload} />
      <Button onClick={onDelete}>사진 삭제</Button>
    </ButtonGroup>
  </ImageUpload>
);

export default ImageUploader;
