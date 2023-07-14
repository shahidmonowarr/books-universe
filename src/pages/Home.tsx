import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Footer from '../layout/Footer';

export default function Home() {
  return (
    <>
      <div className="flex items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div className="items-center justify-center">
          <h1 className="mt-10 text-5xl font-black uppercase text-primary">
            Welcome to Books Universe
          </h1>
          <Button className="mt-10" asChild>
            <Link to="/books">Brows all books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}