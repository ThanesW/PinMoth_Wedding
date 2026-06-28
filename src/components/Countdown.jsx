import {useEffect,useState} from 'react';

export default function Countdown(){
 const [time,setTime]=useState('');

 useEffect(()=>{
  const timer=setInterval(()=>{
   const target=new Date('2026-12-19T18:00:00');
   const diff=target-new Date();

   const days=Math.floor(diff/86400000);
   const hours=Math.floor(diff/3600000)%24;
   const mins=Math.floor(diff/60000)%60;
   const secs=Math.floor(diff/1000)%60;

   setTime(`${days} Days ${hours} Hours ${mins} Minutes ${secs} Seconds`);
  },1000);

  return ()=>clearInterval(timer);
 },[]);

 return <section><h2>Countdown</h2><h3>{time}</h3></section>
}
