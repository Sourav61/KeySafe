import React, { useEffect, useState } from 'react'
import './App.css'
import Axios from 'axios'
import ModalPopup from './Components/ModalPopup';

function App() {
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [passOk, setPassOk] = useState(false);
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4001/showpasswords").then((response) => {
      setPasswordList(response.data)
    })
  }, [])

  function addPassword(e) {
    var passwordProtect = document.getElementById('pass');
    var social = document.getElementById('social');
    if (title == '' || password == '') {
      if (password == '') {
        passwordProtect.classList.add('error');
        passwordProtect.style.border = '2px solid red'

        setTimeout(function () {
          passwordProtect.classList.remove('error');
        }, 300);

        e.preventDefault();
      } else {

        passwordProtect.style.border = null;
        setPassOk(true);
      }

      if (passOk == true && title == '') {
        social.classList.add('error');
        social.style.border = '2px solid red'

        setTimeout(function () {
          social.classList.remove('error');
        }, 300);

        e.preventDefault();
      } else {
        social.style.border = null;
      }
    } else {
      // if (!passwordProtect.value.match(/^[A-Za-z]\w{7,14}$/)) {
      //   alert('Are you sure you want to continue?');
      // }
      social.style.border = null;
      Axios.post('http://localhost:4001/addpassword', {
        password: password,
        title: title,
      })
    }
  }

  const decryptPassword = (encryption) => {
    Axios.post('http://localhost:4001/decryptpassword', {
      password: encryption.password,
      iv: encryption.iv
    }).then((response) => {
      setPasswordList(passwordList?.map((val) => {
        return val?.id == encryption.id ? { id: val.id, password: val.password, title: response.data, iv: val.iv } : val;
      }))
    })
  }

  return (
    <div className="App">
      {/* <ModalPopup /> */}
      <div className='addPassword'>
        <input type="text" placeholder='Ex: password123' name="" id="pass" onChange={(event) => setPassword(event.target.value)} />
        <input type="text" placeholder='Ex: Facebook' name="" id="social" onChange={(event) => setTitle(event.target.value)} />
        <button type="submit" onClick={(e) => addPassword(e)}>Add Password</button>
      </div>
      <div className='Passwords'>
        {passwordList?.map((val, key) => {
          return (
            <div className='password' onClick={() => decryptPassword({ password: val?.password, iv: val.iv, id: val?.id })} key={key}>
              <h3>{val?.title}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
