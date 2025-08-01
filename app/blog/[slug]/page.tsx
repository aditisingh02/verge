import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/blog";
import BlogPostClient from "./BlogPostClient";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (other posts, excluding current)
  const relatedPosts = posts.filter((p) => p.slug !== params.slug).slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
