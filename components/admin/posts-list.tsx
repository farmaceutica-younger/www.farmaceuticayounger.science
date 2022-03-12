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
        <a className="bg-blue-600 px-4 py-2 text-blue-100 hover:bg-blue-800">
          Crea un nuovo post
        </a>
      </Link>
      <ul className="">
        {posts.map((p) => (
          <li key={p.id} className="mt-4">
            <Link href={`/admin/posts/${p.id}/edit`}>
              <a className="flex cursor-pointer gap-2 align-middle hover:bg-slate-200">
                <img className="w-32" src={p.featuredImage} alt={p.title} />
                <div>
                  <div className="mb-2">
                    {!!p.path ? (
                      <span className="rounded-full bg-green-200 px-2 py-1 text-xs text-green-600">
                        pubblicato
                      </span>
                    ) : (
                      <button
                        className="cursor-pointer rounded-full bg-blue-600 px-2 py-1 text-xs text-blue-200 hover:bg-blue-800"
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
