import { useEffect, useState } from 'react';
import './App.css';
import 'video.js/dist/video-js.css';
import axios from 'axios';

function Player({source, width = 852, height = 480}) {
  console.log(source);
  return (
    <>
      <video src={source} width={width} height={height} controls />
    </>
  )
}

function ResolutionSelector({resolution, handleChange}) {
  return (
    <select name="resolution" id="resolution-select" value={resolution} onChange={handleChange} defaultValue={'1080p'}>
      <option key="1080p" value="1080p">1080p</option>
      <option key="720p" value="720p">720p</option>
      <option key="480p" value="480p">480p</option>
      <option key="360p" value="360p">360p</option>
    </select>
  )
}

function WowVideo({sources}) {
  const [resolution, setResolution] = useState("1080p");

  const handleChange = (event) => {
    setResolution(event.target.value);
  }

  return (
    <div className='player'>
      <ResolutionSelector resolution={resolution} handleChange={handleChange} />
      <Player source={sources[resolution]} />
    </div>
  )
}

function WowCard({clip}) {
  return (
    <div className="card spacer">
      <h1>Wow!</h1>
      <p>This wow comes from {clip.movie}</p>
      <p>If you want to find it in the movie itself, scroll too {clip.timestamp}</p>
      <WowVideo sources={clip.video} />
    </div>
  )
}

function HeaderCard() {
  return (
    <div className="card">
      <h1>Is That Owen Wilson?</h1>
    </div>
  )
}


function LoadingCard() {
  return (
    <div className="card">
      <h1>Wow, it's loading</h1>
    </div>
  )
}

function Footer() {
  return (
    <footer>
      <p>This is a little project for me to learn React</p>
      <p>The design is shit, but you get to hear "Wow" over and over again</p>
      <p>Have fun!</p>
      <p>© 2022, Rhys Johns</p>
      <p>Quotes powered by <a href='https://owen-wilson-wow-api.herokuapp.com/'>The Owen Wilson WOW API</a></p>
    </footer>
  )
}

function App() {
  const [owenWilsonClip, setOwenWilsonClip] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    axios.get("https://owen-wilson-wow-api.herokuapp.com/wows/random")
      .then((response) => {
        setOwenWilsonClip(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <div className='page-center'>
        <div>
          <LoadingCard />
          <Footer />
        </div>
      </div>
    )
  }
  return (
    <div className='page-center'>
      {isError 
        ? <h1>Wow, there was an error</h1>
        : 
        (
          <div>
            <HeaderCard src="https://owen-wilson-wow-api.herokuapp.com/static/media/Logo.3b55998c204f27064b30.png" />
            {owenWilsonClip.map((clip) => (
              <WowCard 
                key={clip.movie} 
                clip={clip} 
              />))}
            <Footer />
          </div>
        )
      }
    </div>    
  );
}

export default App;
