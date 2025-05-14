import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// App을 렌더링하는 함수 호출
renderApp();

// 성능 측정을 원하면 이 함수로 결과를 로깅하거나 분석 엔드포인트에 전송할 수 있습니다.
reportWebVitals();
