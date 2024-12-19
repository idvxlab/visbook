import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import VideoPlayer from './components/VideoPlayer';
import './App.scss';  // 引入全局样式

function App() {
  return (
    <Router basename="/visbook">
      <div className="App">
        {/* 路由配置 */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* 默认加载Home页面 */}
          <Route path="/video-player" element={<VideoPlayer />} />
          {/* 可以在此添加其他页面的路由 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
