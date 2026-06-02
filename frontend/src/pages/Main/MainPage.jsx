// 메인페이지
import { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [index, setIndex] = useState('');

  useEffect(() => {
    axios.get('/api/hello')
      .then(res => setIndex(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      메인 화면
      <p>백엔드 요청 확인 : {index}</p>
    </div>
  );
};

export default MainPage;
