import type { Post } from "@prisma/client";
import Link from "next/link";

interface PostListProps {
  posts: Post[];
  publish: (postId: string) => void;
}

export const PostsList = ({ posts, publish }: PostListProps) => {
  return (
    <div>
      <Link href="/admin/posts/new">
        <a className="bg-blue-600 text-blue-100 px-4 py-2 hover:bg-blue-800">
          Crea un nuovo post
        </a>
      </Link>
      <ul className="">
        {posts.map((p) => (
          <li key={p.id} className="mt-4">
            <Link href={`/admin/posts/${p.id}/edit`}>
              <a className="flex gap-2 align-middle cursor-pointer hover:bg-slate-200">
                <img className="w-32" src={p.featuredImage} alt={p.title} />
                <div>
                  <div className="mb-2">
                    {!!p.path ? (
                      <span className="bg-green-200 text-green-600 px-2 py-1 text-xs rounded-full">
                        pubblicato
                      </span>
                    ) : (
                      <button
                        className="text-blue-200 bg-blue-600 hover:bg-blue-800 cursor-pointer px-2 py-1 text-xs rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          publish(p.id);
                        }}
                      >
                        {" "}
                        Pubblica{" "}
                      </button>
                    )}
                  </div>
                  <h4 className="text-sm text-stone-800">{p.title}</h4>
                  <p className="text-sm text-stone-600"> {p.description}</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
