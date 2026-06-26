import { ToastProvider } from '@/shared/ui/ToastProvider';
import Layout from '@/shared/components/Layout';
import HomePage from '@/pages/home/page';

function App() {
    return (
        <ToastProvider>
            <Layout>
                <HomePage />
            </Layout>
        </ToastProvider>
    );
}

export default App;
