import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// React Router DOM:
import { BrowserRouter } from 'react-router-dom'
import { PrayerTimesContextProvider } from '@contexts/PrayerTimesContext'

// Tanstac:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextPrayerContextProvider } from '@contexts/NextPrayerContext'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PrayerTimesContextProvider>
          <NextPrayerContextProvider>
            <App />
          </NextPrayerContextProvider>
        </PrayerTimesContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)