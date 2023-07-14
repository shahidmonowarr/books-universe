
import { IBook } from '../types/globalTypes';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface IProps {
  book: IBook;
}

export default function bookCard({ book }: IProps) {

  const handleAddBook = (book: IBook) => {
    toast({
      description: 'book Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        
        <p></p>
        <p className="text-sm">
          Availability:
        </p>
        <p className="text-sm">Price:</p>
        <Button variant="default" onClick={() => handleAddBook(book)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}