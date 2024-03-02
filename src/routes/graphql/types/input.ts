type PostType = {
  title: string;
  content: string;
  authorId: string;
};

export type CreatePostInputType = {
  dto: PostType;
};

export type ChangePostInputType = {
  id: string;
  dto: Omit<PostType, 'authorId'>;
};

export type DeletePostInputType = {
  id: string;
};

type ProfileType = {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId: string;
};

export type CreateProfileInputType = {
  dto: ProfileType;
};

export type ChangeProfileInputType = {
  id: string;
  dto: Omit<ProfileType, 'userId'>;
};

export type DeleteProfileInputType = {
  id: string;
};

type UserType = {
  name: string;
  balance: number;
};

export type CreateUserInputType = {
  dto: UserType;
};

export type ChangeUserInputType = {
  id: string;
  dto: UserType;
};

export type DeleteUserInputType = {
  id: string;
};

export type UserSubscriptionType = {
  userId: string;
  authorId: string;
}