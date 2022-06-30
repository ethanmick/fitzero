import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type CreateExerciseInput = {
  name: Scalars['String'];
  type: ExerciseType;
};

export type CreateExerciseLogInput = {
  eventDate: Scalars['Time'];
  exercise: Scalars['ID'];
  sets: Array<ExerciseLogSetInput>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Exercise = {
  __typename?: 'Exercise';
  canDelete: Scalars['Boolean'];
  createdAt: Scalars['Time'];
  createdBy: User;
  id: Scalars['ID'];
  logs: Array<ExerciseLog>;
  modifiedAt?: Maybe<Scalars['Time']>;
  modifiedBy?: Maybe<User>;
  name: Scalars['String'];
  type: ExerciseType;
};

export type ExerciseLog = {
  __typename?: 'ExerciseLog';
  createdAt: Scalars['Time'];
  createdBy: User;
  eventDate: Scalars['Time'];
  exercise: Exercise;
  id: Scalars['ID'];
  modifiedAt?: Maybe<Scalars['Time']>;
  modifiedBy?: Maybe<User>;
  sets: Array<ExerciseLogSet>;
  stats: ExerciseLogStats;
};

export type ExerciseLogSet = {
  __typename?: 'ExerciseLogSet';
  reps: Scalars['Int'];
  setNumber: Scalars['Int'];
  unit: Unit;
  weight: Scalars['Float'];
};

export type ExerciseLogSetInput = {
  reps: Scalars['Int'];
  unit?: InputMaybe<Unit>;
  weight: Scalars['Float'];
};

export type ExerciseLogStats = {
  __typename?: 'ExerciseLogStats';
  avgReps: Scalars['Float'];
  avgWeight: Scalars['Float'];
  maxReps: Scalars['Int'];
  maxWeight: Scalars['Int'];
  minReps: Scalars['Int'];
  minWeight: Scalars['Int'];
  totalSets: Scalars['Int'];
};

export enum ExerciseType {
  Strength = 'STRENGTH'
}

/** The mutation root of the GraphQL interface. */
export type Mutation = {
  __typename?: 'Mutation';
  createExercise: Exercise;
  createExerciseLog: ExerciseLog;
  createUser: User;
  deleteExercise: Scalars['ID'];
  deleteExerciseLog: Scalars['ID'];
  noop: Scalars['Int'];
  updateExercise: Exercise;
  updateExerciseLog: ExerciseLog;
  updateUser: User;
};


/** The mutation root of the GraphQL interface. */
export type MutationCreateExerciseArgs = {
  exercise: CreateExerciseInput;
};


/** The mutation root of the GraphQL interface. */
export type MutationCreateExerciseLogArgs = {
  exerciseLog?: InputMaybe<CreateExerciseLogInput>;
};


/** The mutation root of the GraphQL interface. */
export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


/** The mutation root of the GraphQL interface. */
export type MutationDeleteExerciseArgs = {
  id: Scalars['ID'];
};


/** The mutation root of the GraphQL interface. */
export type MutationDeleteExerciseLogArgs = {
  id: Scalars['ID'];
};


/** The mutation root of the GraphQL interface. */
export type MutationUpdateExerciseArgs = {
  exercise: UpdateExerciseInput;
};


/** The mutation root of the GraphQL interface. */
export type MutationUpdateExerciseLogArgs = {
  exerciseLog?: InputMaybe<UpdateExerciseLogInput>;
};


/** The mutation root of the GraphQL interface. */
export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};

/** The query root of the GraphQL interface. */
export type Query = {
  __typename?: 'Query';
  exercise: Exercise;
  exerciseLog: ExerciseLog;
  exerciseLogs: Array<ExerciseLog>;
  exercises: Array<Exercise>;
  /** Fetch the current user information. */
  me: User;
  user: User;
  users: Array<User>;
};


/** The query root of the GraphQL interface. */
export type QueryExerciseArgs = {
  id: Scalars['ID'];
};


/** The query root of the GraphQL interface. */
export type QueryExerciseLogArgs = {
  id: Scalars['ID'];
};


/** The query root of the GraphQL interface. */
export type QueryExerciseLogsArgs = {
  exerciseId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  reps?: InputMaybe<Scalars['Int']>;
  sets?: InputMaybe<Scalars['Int']>;
};


/** The query root of the GraphQL interface. */
export type QueryExercisesArgs = {
  name?: InputMaybe<Scalars['String']>;
};


/** The query root of the GraphQL interface. */
export type QueryUserArgs = {
  id: Scalars['ID'];
};

export enum Unit {
  Hour = 'HOUR',
  Kilogram = 'KILOGRAM',
  Minute = 'MINUTE',
  Pound = 'POUND',
  Second = 'SECOND'
}

export type UpdateExerciseInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateExerciseLogInput = {
  eventDate?: InputMaybe<Scalars['Time']>;
  exercise?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  sets?: InputMaybe<Array<ExerciseLogSetInput>>;
};

export type UpdateUserInput = {
  currentPassword?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  newPassword?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  type: Scalars['String'];
  username: Scalars['String'];
};

export type ExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { __typename?: 'Query', exercises: Array<{ __typename?: 'Exercise', id: string, name: string }> };

export type ListExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListExercisesQuery = { __typename?: 'Query', exercises: Array<{ __typename?: 'Exercise', id: string, name: string, createdAt: any, logs: Array<{ __typename?: 'ExerciseLog', eventDate: any }> }> };


export const ExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ExercisesQuery, ExercisesQueryVariables>;
export const ListExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ListExercisesQuery, ListExercisesQueryVariables>;