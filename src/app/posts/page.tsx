import { PageHeading } from "@/components/PageHeading";
import { PostSummaryList } from "@/components/PostSummaryList";
import { getArticles } from "@/utils/content/getArticles";

export default async function Posts() {
  const posts = await getArticles();

  return (
    <>
      <div className="pb-4">
        <PageHeading>The Blog</PageHeading>
      </div>
      <section>
        <PostSummaryList posts={posts} displayFacets={true} />
      </section>
    </>
  );
}
