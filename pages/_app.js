import 'tailwindcss/tailwind.css';
import Navbar from '../components/Navbar';
import Meta from '../components/Meta';
import { AuthProvider } from '../components/globalState';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Meta />
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
