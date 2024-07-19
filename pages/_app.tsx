import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 min-h-[100dvh]">
        <Component {...pageProps} />
      </main>
      <Footer />
    </Provider>
  )
}

export default MyApp
