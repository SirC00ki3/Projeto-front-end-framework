import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Row from '../components/Row/Row';
import './MyListPage.css';

function MyListPage({ myList }) {
  return (
    <>
      <Header myList={myList} />
      <div className="mylist-page-container">
        <h1 className="mylist-title" style={{ marginTop: '100px' }}>Minha Lista</h1>
        {myList && myList.length > 0 ? (
          <Row movies={myList} title="" />
        ) : (
          <p className="mylist-message">Sua lista está vazia. Adicione filmes para vê-los aqui!</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyListPage;