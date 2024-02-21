import React from 'react'
import ReactDOM from 'react-dom/client'
import {

  RouterProvider
} from "react-router-dom";
import './index.css'
import { router } from './Components/Router/Route.jsx';
import AuthContributor from './Components/AuthContributor/AuthContributor.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='bg-[#04364A] max-w-[1800px] mx-auto'>
    <React.StrictMode>
      <AuthContributor>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>

      </AuthContributor>

    </React.StrictMode>,
  </div>
)
