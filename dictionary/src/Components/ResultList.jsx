import React, { useContext, useEffect, useState } from 'react'
import { InputContext } from '../App';
import axios from "axios";
import MeaningList from './MeaningList';
import Example from './Example';
import Synonym from './Synonym';
import Antonym from './Antonym';

axios.defaults.baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const ResultList = () => {


  const { inputValue } = useContext(InputContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const[audio,setAudio] = useState(null);

  const fetchData = async (param) => {
    try {
      setLoading(true);
      const response = await axios(`/${param}`);
      setResponse(response.data);

        // Handle audio logic within the response data
        if (response.data.length && response.data[0].phonetics) {
          const phonetics = response.data[0].phonetics;
          const firstPhonetic = phonetics[0]; // Assuming first phonetic
          if (firstPhonetic.audio) {
            const audioUrl = firstPhonetic.audio.replace(
              '//api',
              'https://api'
            );
            setAudio(new Audio(audioUrl));
          }
        }

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (inputValue.length) {
      fetchData(inputValue);
    }
  }, [inputValue]);

  console.log(response);

  if (loading) {
    return (
      <div className='flex flex-col space-y-3 animate-pulse p-4 container mx-auto max-w-2xl'>
        <div className='h-6 bg-gray-300 mt-5 rounded-md '></div>
        <div className='h-40 bg-gray-300 mt-5 rounded-md '></div>
        <div className='h-8 bg-gray-300 mt-5 rounded-md '></div>
        <div className='h-40 bg-gray-300 mt-5 rounded-md '></div>

      </div>
    )
  }

  if (error) {
    return <h1 className='text-center mt-10 font-semibold text-gray-500'>No Definitions Found.</h1>
  }

  return (
    <div className='container mx-auto p-4 max-w-2xl'>
      {response && (

        <div>
          {
            audio && (
              <button onClick={() => audio.play()}>Audio</button>
            )
          }
          <h3 className='text-2xl font-bold mt-4 text-left'>Meaning and Definitions:</h3>
          <MeaningList mean={response}></MeaningList>
          <h3 className='text-2xl font-bold mt-4 text-left'>Example:</h3>
          <Example mean={response}></Example>
          <h3 className='text-2xl font-bold mt-4 text-left'>Synonym:</h3>
          <Synonym mean={response}></Synonym>
          <h3 className='text-2xl font-bold mt-4 text-left'>Antonym:</h3>
          <Antonym mean={response}></Antonym>
        </div>

      )

      }
    </div>
  )
}

export default ResultList
