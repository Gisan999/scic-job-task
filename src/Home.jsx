// import { useState } from 'react'
import './App.css'
import Banner from './Components/Banner/Banner'


function App() {
  // const [data, setData] = useState(null);

  // const dragStarted = (e, id) => {
  //   console.log('Drag has started');
  //   e.dataTransfer.setData("todoId", id)

  // }

  // const draggingOver = (e) => {
  //   e.preventDefault();
  //   console.log('dragging over now');
  // }

  // const dragDrope = (e) => {
  //   console.log('you have dropped');
  // }

  return (
    <>
      {/* <h1 className='text-5xl font-bold font-serif uppercase underline'>Vite + React</h1> */}
<Banner/>

      {/* 
      <div className='grid grid-cols-3 gap-5'>


        <div className='border h-96'>

          <div draggable onDragStart={(e) => dragStarted(e)} className='border flex justify-around p-3'>

            <h2 className='py-5'>hello</h2>
            <h2 className='py-5'>mr</h2>
            
          </div>

        </div>


        <div onDragOver={(e)=>draggingOver(e)} onDrop={(e)=>dragDrope(e)} className='border h-96'>
          <h2 className='text-center text-2xl font-medium'>In Progress</h2>
        </div>


        <div className='border h-96'>
        </div>
      </div> */}
    </>
  )
}

export default App
