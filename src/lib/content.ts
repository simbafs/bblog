import {
    getCollection,
    type CollectionEntry,
    type CollectionKey,
} from "astro:content";

type Blog = CollectionEntry<CollectionKey>;

export function sortBlogByDate(posts: Blog[]) {
    return posts.toSorted((a, b) => {
        return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
    });
}

export async function countTags(
    collectionKey: CollectionKey,
): Promise<[string, number][]> {
    const collections = await getCollection(collectionKey);
    const tags = collections.flatMap((post) => post.data.tags);
    const tagsMap = tags.reduce((acc, tag) => {
        acc.set(tag, (acc.get(tag) || 0) + 1);
        return acc;
    }, new Map<string, number>());
    const tagsCount = Array.from(tagsMap.entries()).toSorted(
        (a, b) => b[1] - a[1],
    );

    return tagsCount;
}

export async function getPostsInTag(tag: string, collectionKey: CollectionKey) {
    const collections = await getCollection(collectionKey);
    const posts = collections.filter((post) => post.data.tags.includes(tag));
    return sortBlogByDate(posts);
}
