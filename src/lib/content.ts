import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

// 踢掉 `collection` 屬性，這樣只要有一樣的 schema 就都可以用`
export type Post = Omit<CollectionEntry<"blog">, "collection">;

export async function getPosts(collectionKey: CollectionKey): Promise<Post[]> {
  const collections = await getCollection(collectionKey);
  return collections.toSorted(blogSorter) satisfies CollectionEntry<
    typeof collectionKey
  >[];
}

/** @example getPpsts('blog').toSorted(blogSorter) */
export function blogSorter(a: Post, b: Post) {
  return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
}

/** @example getPosts('blog').then(countTags) */
export function countTags(posts: Post[]): [string, number][] {
  const tags = posts.flatMap((post) => post.data.tags);
  const tagsMap = tags.reduce((acc, tag) => {
    acc.set(tag, (acc.get(tag) || 0) + 1);
    return acc;
  }, new Map<string, number>());
  const tagsCount = Array.from(tagsMap.entries()).toSorted(
    (a, b) => b[1] - a[1],
  );

  return tagsCount;
}

/** @example getPosts('blog').then(inTag('linux')) */
export function inTag(tag: string): (posts: Post[]) => Post[] {
  return (posts: Post[]) => {
    return posts
      .filter((post) => post.data.tags.includes(tag))
      .toSorted(blogSorter);
  };
}

/** @example getPosts('blog').then(years) */
export function years(posts: Post[]) {
  return [
    ...new Set(posts.map((post) => post.data.publishDate.getFullYear())),
  ].sort((a, b) => b - a);
}
