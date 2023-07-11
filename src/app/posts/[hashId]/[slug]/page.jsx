import PostDetail from "../../PostDetail"
import { getPost } from "@/services/fetchData"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }) {
  const hashId = params.hashId
  const slug = params.slug
  try {
    const post = await getPost(slug,hashId)
    return {
      title: post.title
    }
  } catch (error) {   
    if (error.status === 404) {
      notFound();
    }
    return {
      title : 'آگهی مورد نظر یافت نشد'
    }
  }

}
const page = () => {
  return (
    <PostDetail/>
  )
}

export default page
