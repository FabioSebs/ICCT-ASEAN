import { useRouter } from 'next/router';


interface Props {
    id : string
}

const Page = ({ id } : Props) => {
  const router = useRouter();
  const postId = id || router.query.id;

  return <p>Post: {postId}</p>;
};

export default Page;
