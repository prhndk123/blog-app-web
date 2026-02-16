export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  content: string;
  category: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: { name: string };
}
