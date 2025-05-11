import { getCollection, type CollectionKey } from "astro:content";

export async function countTags(collectionKey: CollectionKey) {
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
