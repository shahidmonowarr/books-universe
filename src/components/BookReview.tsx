// import { ChangeEvent, FormEvent, useState } from "react";
// import { FiSend } from "react-icons/fi";
// import {
//   useReviewBookMutation,
// } from "../redux/features/books/bookApi";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";

// interface IProps {
//   id: string;
// }

// export default function BookReview({ id }: IProps) {
//   const [inputValue, setInputValue] = useState<string>("");

//   // const { data } = useGetCommentsQuery(id, {
//   //   refetchOnMountOrArgChange: true,
//   //   pollingInterval: 30000,
//   // });

//   const [postComment, { isLoading, isError, isSuccess }] =
//   useReviewBookMutation();

//   console.log({ isLoading, isError, isSuccess });

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const options = {
//       id: id,
//       data: {
//         comment: inputValue,
//       },
//     };
//     postComment(options);
//     setInputValue("");
//   };

//   const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
//     setInputValue(event.target.value);
//   };
//   return (
//     <div className="max-w-3xl mx-auto mt-5">
//       <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
//         <Textarea
//           className="min-h-[30px]"
//           onChange={handleChange}
//           value={inputValue}
//           placeholder="Write a comment..."
//         />
//         <Button
//           type="submit"
//           className="rounded-full h-10 w-10 p-2 text-[25px]"
//         >
//           <FiSend />
//         </Button>
//       </form>
//       <div className="mt-10">
//         {data?.comments?.map((comment: string, index: number) => (
//           <div key={index} className="flex gap-3 items-center mb-2">
//             <Avatar>
//               <AvatarImage src="https://github.com/shadcn.png" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <p>{comment}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
