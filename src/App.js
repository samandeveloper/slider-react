import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';


function App() {
  //states
  const[people,setPeople] = useState(data)   //receiving data
  const[index,setIndex] = useState(0)   //since we have different slides

  //set timer to scroll the section-center
  useEffect(()=>{
    let slider = setInterval(() =>{
      index < people.length-1 ? setIndex(index+1) : setIndex(0)
    },5000);
    return(()=>{
      clearInterval(slider)
    })
  },[index])

  const handleClickPrev = () =>{
    index === 0 ? setIndex(people.length-1) : setIndex(index-1)
  }

  const handleClickNext = () =>{
    index === people.length-1 ? setIndex(0) : setIndex(index+1)
  }
 
  return(
    <section className='section'>
      <div className='title'>
          <h2><span>/</span>reviews</h2>
        </div>
        <div className='section-center'>
          {people.map((person,i)=>{
            //destructure
            const{id,image,name,title,quote} = person
            //adding className-- by defualt we set "nextSlide" for each slide
            let position = "nextSlide"
            //conditions for "nextSlide", "lastSlide" and "activeSlide"--compare i and index
            if(i === index){
              position = "activeSlide"
            }
            //index is the current page and i is the answer
            if(i === index-1 || index === 0 && i === people.length-1){
              position = "lastSlide"
            }
            return(
              <article className={position} key={id}>
                <img src={image} className='person-img'/>
                <h4>{name}</h4>
                <p className='title'>{title}</p>
                <p className='text'>{quote}</p>
                <FaQuoteRight className="icon"></FaQuoteRight>
              </article>
            )
          })}
          <button className='prev' onClick={handleClickPrev}><FiChevronLeft></FiChevronLeft></button>
          <button className='next' onClick={handleClickNext}><FiChevronRight></FiChevronRight></button>
        </div>
    </section>
  )
}

export default App;
