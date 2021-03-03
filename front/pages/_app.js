/**
 * _app.js: 모든 웹 페이지의 공통 부분을 처리한다.
 * (Component는 index.js, profile.js, register.js, ...)
 */
import React from 'react';
import Head from 'next/head';
import {PropTypes} from 'prop-types';
import 'antd/dist/antd.css';

function App({Component}) {
  return (
    <>
      <Head>
        <meta charSet="uft-8"/>
        <title>Twitter</title>
      </Head>
      <div>공통 메뉴</div>
      <Component/>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
