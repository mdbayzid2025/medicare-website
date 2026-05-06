
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  

  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
      theme="dark"
      position="top-right"
      autoClose={3000}
      closeOnClick
      rtl={false}      
      limit={1}
      pauseHover={false} />                  
    </div>
  );
}

export default App;
