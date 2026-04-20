export interface FeedPost {
  id: string;
  imageUrl: string;
  username: string;
  userAvatar: string;
  userRating?: number;
  communityAverage?: number;
  timestamp: string;
}

const SAVED_POSTS_STORAGE_KEY = 'carspot-saved-posts';
const CREATED_POSTS_STORAGE_KEY = 'carspot-created-posts';

export const feedPosts: FeedPost[] = [
  {
    id: '1',
    imageUrl: '/feed-images/car-van.png',
    username: 'van_spotter',
    userAvatar: 'VS',
    userRating: 9,
    communityAverage: 8.7,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    imageUrl: '/feed-images/car-road.png',
    username: 'daily_driver',
    userAvatar: 'DD',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    imageUrl: '/feed-images/car-night.png',
    username: 'night_cruiser',
    userAvatar: 'NC',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    imageUrl: '/feed-images/car-red.png',
    username: 'supercar_watch',
    userAvatar: 'SW',
    userRating: 7,
    communityAverage: 8.2,
    timestamp: '2 days ago',
  },
];

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export function getCreatedPosts() {
  if (!canUseStorage()) return [];

  try {
    const parsedPosts = JSON.parse(window.localStorage.getItem(CREATED_POSTS_STORAGE_KEY) || '[]') as FeedPost[];
    return Array.isArray(parsedPosts) ? parsedPosts : [];
  } catch {
    return [];
  }
}

export function saveCreatedPosts(posts: FeedPost[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CREATED_POSTS_STORAGE_KEY, JSON.stringify(posts));
}

export function addCreatedPost(imageUrl: string) {
  const post: FeedPost = {
    id: `user-post-${Date.now()}`,
    imageUrl,
    username: 'currentuser',
    userAvatar: 'CE',
    timestamp: 'Just now',
  };
  const posts = [post, ...getCreatedPosts()];
  saveCreatedPosts(posts);
  return post;
}

export function deleteCreatedPost(postId: string) {
  const posts = getCreatedPosts().filter((post) => post.id !== postId);
  saveCreatedPosts(posts);

  const savedPostIds = getSavedPostIds();
  if (savedPostIds.has(postId)) {
    savedPostIds.delete(postId);
    saveSavedPostIds(savedPostIds);
  }

  return posts;
}

export function getFeedPosts() {
  return [...getCreatedPosts(), ...feedPosts];
}

export function getSavedPostIds() {
  if (!canUseStorage()) return new Set<string>();

  try {
    const parsedIds = JSON.parse(window.localStorage.getItem(SAVED_POSTS_STORAGE_KEY) || '[]');
    return new Set<string>(Array.isArray(parsedIds) ? parsedIds : []);
  } catch {
    return new Set<string>();
  }
}

export function saveSavedPostIds(savedPostIds: Set<string>) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SAVED_POSTS_STORAGE_KEY, JSON.stringify(Array.from(savedPostIds)));
}

export function getSavedPosts() {
  const savedPostIds = getSavedPostIds();
  return getFeedPosts().filter((post) => savedPostIds.has(post.id));
}
