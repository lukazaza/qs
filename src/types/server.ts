export interface Server {
  id: string;
  name: string;
  icon: string;
  description: string;
  fullDescription: string;
  inviteLink: string;
  members: number;
  categories: string[];
  aiStatus: 'SAFE' | 'NSFW' | 'DUBIOUS';
  votes: number;
  createdAt: string;
}