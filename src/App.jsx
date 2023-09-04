import axios from "axios";
import { useRef, useState } from "react"
import { useEffect } from "react";
import { youtube_parser } from "./utils";
// import fileDownload from 'js-file-download'

function App() {
  const inputUrlRef = useRef();
  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();
  const [urlResultA, setUrlResultA] = useState(null);
  const [urlResultV, setUrlResultV] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); // Track whether to show the login form

  const username = "deep";
  const password = "welcome1";

  const handleLogin = (e) => {
    e.preventDefault();

    if (loggedIn) {
      // If already logged in, perform logout
      setLoggedIn(false);
      setShowLoginForm(false);
      return;
    }

    const enteredUsername = inputUsernameRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    if (enteredUsername === username && enteredPassword === password) {
      setLoggedIn(true);
      setShowLoginForm(false);
    } else {
      alert("Invalid credentials. Please try again.");
    }

    inputUsernameRef.current.value = "";
    inputPasswordRef.current.value = "";
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleAudio = (e) => {
    e.preventDefault()

    if (!loggedIn) {
      alert("Please log in to use this feature.");
      return;
    }

    const youtubeID = youtube_parser(inputUrlRef.current.value);
    console.log(1.11)
    const options = {
      method: 'get',
      // url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY_vid,
        // 'X-RapidAPI-Host' :'ytstream-download-youtube-videos.p.rapidapi.com'
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    // axios(options)
    //     .then(res => {console.log(res.data.adaptiveFormats),setUrlResultA(res.data.adaptiveFormats[21].url)})

    //     .catch(err => console.log(err))
    axios(options)
      .then(res => setUrlResultA(res.data.link))
      .catch(err => console.log(err))


    inputUrlRef.current.value = '';

  }


  const handleVideo = (e) => {
    e.preventDefault()

    if (!loggedIn) {
      alert("Please log in to use this feature.");
      return;
    }

    const youtubeID = youtube_parser(inputUrlRef.current.value);

    // console.log(inputUrlRef.current.value)
    const options = {
      method: 'GET',
      url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
      params: {
        id: youtubeID
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY_vid,
        'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        // 'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
      }
    };

    // response.blob().then(blob => {
    //   let url = window.URL.createObjectURL(blob);
    //   let a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'employees.json';
    //   a.click();
    // });

    axios(options)
      .then((res) => {
        console.log(res.data.adaptiveFormats[0].url)
        setUrlResultV(res.data.adaptiveFormats[0].url)
      })
      .catch(err => console.log(err))



    inputUrlRef.current.value = '';

  }

  return (
    //   <div className="app">
    //     {loggedIn ? (
    //       <button onClick={handleLogout}>Log Out</button>
    //     ) : (
    //       <form className="login-form" onSubmit={handleLogin}>
    //         <input
    //           type="text"
    //           placeholder="Username"
    //           ref={inputUsernameRef}
    //           required
    //         />
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           ref={inputPasswordRef}
    //           required
    //         />
    //         <button type="submit">Log In</button>
    //       </form>
    //     )}
    //     <span className="logo">Gada</span>
    //     <section className="content">
    //       <h1 className="content_title">YouTube to MP3/Video Converter</h1>
    //       <p className="content_description">
    //         Transform YouTube videos into MP3/Mp4 in just a few clicks!
    //       </p>

    //       <form className="form">
    //         <input ref={inputUrlRef} placeholder="Paste a Youtube video URL link..." className="form_input" type="text" />
    //         {/* <button onClick={()=>{handleAudio;handleVideo}} type="submit" className="form_button">Search</button> */}
    //         <button onClick={handleAudio} type="submit" className="form_button">Mp3</button>
    //         <button onClick={handleVideo} type="submit" className="form_button">Video</button>

    //       </form>

    //       {urlResultA ? <a target='_blank' rel="noreferrer" href={urlResultA} className="download_btn my-2">Download MP3</a> : ''}
    //       {urlResultV ? <a target='_blank' rel="noreferrer" href={urlResultV} className="form_button">Download Video</a> : ''}

    //       {/* onClick={() => {
    // 	fetch({urlResultV})
    // 		.then(response => {
    // 			response.blob().then(blob => {
    // 				let url = window.URL.createObjectURL(blob);
    // 				let a = document.createElement('a');
    // 				a.href = url;
    // 				a.download = `${youtubeID}`;
    // 				a.click();
    // 			});
    // 			window.location.href = response.url;
    // 	});
    // }} */}
    //     </section>
    //   </div>
    <div className="app">
      <span className="logo">Gada</span>
      <button
        className="login-button"
        onClick={() => setShowLoginForm(!showLoginForm)}
      >
        {loggedIn ? "Log Out" : "Log In"}
      </button>
      {showLoginForm && !loggedIn && (
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            ref={inputUsernameRef}
            required
          />
          <input
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
            required
          />
          <button type="submit">Log In</button>
        </form>
      )}
      <section className="content">
        <h1 className="content_title">YouTube to MP3/Video Converter</h1>
        <p className="content_description">
          Transform YouTube videos into MP3/Mp4 in just a few clicks!
        </p>

        <form className="form">
          <input ref={inputUrlRef} placeholder="Paste a Youtube video URL link..." className="form_input" type="text" />
          {/* <button onClick={()=>{handleAudio;handleVideo}} type="submit" className="form_button">Search</button> */}
          <button onClick={handleAudio} type="submit" className="form_button">Mp3</button>
          <button onClick={handleVideo} type="submit" className="form_button">Video</button>

        </form>

        {urlResultA ? <a target='_blank' rel="noreferrer" href={urlResultA} className="download_btn my-2">Download MP3</a> : ''}
        {urlResultV ? <a target='_blank' rel="noreferrer" href={urlResultV} className="form_button">Download Video</a> : ''}

      </section>
    </div>









    // before code
    //   <div className="app">
    //     <span className="logo">Gada</span>
    //     <section className="content">
    //       <h1 className="content_title">YouTube to MP3/Video Converter</h1>
    //       <p className="content_description">
    //         Transform YouTube videos into MP3/Mp4 in just a few clicks!
    //       </p>

    //       <form className="form">
    //         <input ref={inputUrlRef} placeholder="Paste a Youtube video URL link..." className="form_input" type="text" />
    //         {/* <button onClick={()=>{handleAudio;handleVideo}} type="submit" className="form_button">Search</button> */}
    //         <button onClick={handleAudio} type="submit" className="form_button">Mp3</button>
    //         <button onClick={handleVideo} type="submit" className="form_button">Video</button>

    //       </form>

    //       {urlResultA ? <a target='_blank' rel="noreferrer" href={urlResultA} className="download_btn my-2">Download MP3</a> : ''}
    //       {urlResultV ? <a target='_blank' rel="noreferrer" href={urlResultV} className="form_button">Download Video</a> : ''}

    //       {/* onClick={() => {
    // 	fetch({urlResultV})
    // 		.then(response => {
    // 			response.blob().then(blob => {
    // 				let url = window.URL.createObjectURL(blob);
    // 				let a = document.createElement('a');
    // 				a.href = url;
    // 				a.download = `${youtubeID}`;
    // 				a.click();
    // 			});
    // 			window.location.href = response.url;
    // 	});
    // }} */}
    //     </section>
    //   </div>
  )
}

export default App