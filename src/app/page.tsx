"use client";
import { useState } from "react";

export default function Home() {
  const [clicks, setclicks] = useState(0);

  function clickhandle(){
    setclicks(clicks + 1)
  }
  return (<div>
    <h1>Body</h1>
    <p>{clicks}</p>
    <button onClick={clickhandle}>click</button>
    </div>)
}
