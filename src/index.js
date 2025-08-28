import ReactDOM from 'react-dom/client';
import './index.css';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './components/ErrorBoundary';
import router from './routes';
import { RouterProvider } from 'react-router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
          <ToastContainer rtl limit={1} theme="colored" transition={Slide}/>
        </QueryClientProvider>
    </ErrorBoundary>
);