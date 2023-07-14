
import {
  HiBookOpen
} from 'react-icons/hi';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export default function Cart() {

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiBookOpen size="30" />
        </Button>
      </SheetTrigger>
      <SheetContent className="relative overflow-auto">
        <SheetHeader>
          <SheetTitle>Wish List</SheetTitle>
        </SheetHeader>
        <div className="space-y-5">
        </div>
      </SheetContent>
    </Sheet>
  );
}