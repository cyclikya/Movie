import { Toaster } from 'react-hot-toast'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'

function App() {
  return (
    <>
      <Layout>
        <HomePage />
      </Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1C1F26',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
          },
        }}
      />
    </>
  )
}

export default App