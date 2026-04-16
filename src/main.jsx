import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// React Router DOM:
import { BrowserRouter } from 'react-router-dom'

// Tanstac:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Context Providers:
import { PrayerTimesContextProvider } from '@contexts/PrayerTimesContext'
import { NextPrayerContextProvider } from '@contexts/NextPrayerContext'
import { SearchContextProvider } from '@contexts/SearchContext'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PrayerTimesContextProvider>
          <NextPrayerContextProvider>
            <SearchContextProvider>
              <App />
            </SearchContextProvider>
          </NextPrayerContextProvider>
        </PrayerTimesContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)