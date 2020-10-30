import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input.js';
import './App.css';

const testData = [
  { objectID: 1, title: 'google', url: 'http://www.google.ca' },
];

export default function App() {
  const title = 'My Search Page';
  const BASEURL = 'https://hn.algolia.com/api/v1/search?query=';

  // Application State
  const [data, setData] = useState(testData);
  const [input, setInput] = useState('hello');
  const [url, setUrl] = useState('');

  const list = data.map((item) => (
    <li key={item.id}>
      {item.title}
      <a href={item.url}></a>
    </li>
  ));
  // Fetch data whenever url changes
  useEffect(() => {
    axios
    .get(url)
    .then((res) => setData([...res.data.hits]))
    .catch((err) => console.log(err));
  }, [url]);

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const onClick = () => {
    setUrl(BASEURL + input);
  };

  return (
    <div className='App'>
      <h4>Search App</h4>
      <h4>{input}</h4>
      <input type='text' value={input} onChange={onChange}></input>
      <button type='button' onClick={onClick}>
        Search
      </button>
      <h4>{url}</h4>
      <ul>{list}</ul>
    </div>
  );
}
