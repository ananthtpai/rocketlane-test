
export interface Reaction {
  id: number,
  name: string,
  emoji: string
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserContentReaction {
  id: number;
  user_id: number;
  reaction_id: number;
  content_id: number;
}

export interface UserContentReactionDetail extends UserContentReaction {
  user?: User,
  reaction?: Reaction
}