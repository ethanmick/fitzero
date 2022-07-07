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

export type ChangeWorkoutExerciseInput = {
  exerciseId: Scalars['ID'];
  workoutId: Scalars['ID'];
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

export type CreateWorkoutInput = {
  exerciseIds: Array<Scalars['ID']>;
  name: Scalars['String'];
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
  addExerciseToWorkout: Workout;
  createExercise: Exercise;
  createExerciseLog: ExerciseLog;
  createUser: User;
  createWorkout: Workout;
  deleteExercise: Scalars['ID'];
  deleteExerciseLog: Scalars['ID'];
  noop: Scalars['Int'];
  removeExerciseFromWorkout: Workout;
  updateExercise: Exercise;
  updateExerciseLog: ExerciseLog;
  updateUser: User;
};


/** The mutation root of the GraphQL interface. */
export type MutationAddExerciseToWorkoutArgs = {
  input: ChangeWorkoutExerciseInput;
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
export type MutationCreateWorkoutArgs = {
  workout: CreateWorkoutInput;
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
export type MutationRemoveExerciseFromWorkoutArgs = {
  input: ChangeWorkoutExerciseInput;
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
  workout: Workout;
  workouts: Array<Workout>;
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


/** The query root of the GraphQL interface. */
export type QueryWorkoutArgs = {
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

export type Workout = {
  __typename?: 'Workout';
  createdAt: Scalars['Time'];
  createdBy: User;
  exercises: Array<Exercise>;
  id: Scalars['ID'];
  modifiedAt?: Maybe<Scalars['Time']>;
  modifiedBy?: Maybe<User>;
  name: Scalars['String'];
};

export type ExerciseLogQueryVariables = Exact<{
  exerciseLogId: Scalars['ID'];
}>;


export type ExerciseLogQuery = { __typename?: 'Query', exerciseLog: { __typename?: 'ExerciseLog', id: string, eventDate: any, exercise: { __typename?: 'Exercise', id: string, name: string }, sets: Array<{ __typename?: 'ExerciseLogSet', setNumber: number, reps: number, weight: number }> } };

export type ExerciseLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExerciseLogsQuery = { __typename?: 'Query', exerciseLogs: Array<{ __typename?: 'ExerciseLog', id: string, eventDate: any, exercise: { __typename?: 'Exercise', name: string }, stats: { __typename?: 'ExerciseLogStats', totalSets: number, minReps: number, maxReps: number, avgWeight: number } }> };

export type ExerciseForNewExerciseLogQueryVariables = Exact<{
  exerciseId: Scalars['ID'];
}>;


export type ExerciseForNewExerciseLogQuery = { __typename?: 'Query', exercise: { __typename?: 'Exercise', id: string, name: string, logs: Array<{ __typename?: 'ExerciseLog', id: string, eventDate: any, stats: { __typename?: 'ExerciseLogStats', totalSets: number, minReps: number, maxReps: number, avgWeight: number } }> } };

export type CreateExerciseLogMutationVariables = Exact<{
  exerciseLog?: InputMaybe<CreateExerciseLogInput>;
}>;


export type CreateExerciseLogMutation = { __typename?: 'Mutation', createExerciseLog: { __typename?: 'ExerciseLog', id: string } };

export type ExerciseQueryVariables = Exact<{
  exerciseId: Scalars['ID'];
}>;


export type ExerciseQuery = { __typename?: 'Query', exercise: { __typename?: 'Exercise', id: string, name: string, logs: Array<{ __typename?: 'ExerciseLog', id: string, eventDate: any, stats: { __typename?: 'ExerciseLogStats', totalSets: number, minReps: number, maxReps: number, avgWeight: number } }> } };

export type ExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { __typename?: 'Query', exercises: Array<{ __typename?: 'Exercise', id: string, name: string }> };

export type ListExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListExercisesQuery = { __typename?: 'Query', exercises: Array<{ __typename?: 'Exercise', id: string, name: string, createdAt: any, logs: Array<{ __typename?: 'ExerciseLog', eventDate: any }> }> };

export type WorkoutQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkoutQuery = { __typename?: 'Query', workout: { __typename?: 'Workout', id: string, name: string, exercises: Array<{ __typename?: 'Exercise', id: string, name: string }> } };

export type WorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkoutsQuery = { __typename?: 'Query', workouts: Array<{ __typename?: 'Workout', id: string, name: string }> };

export type NewWorkoutPageQueryVariables = Exact<{ [key: string]: never; }>;


export type NewWorkoutPageQuery = { __typename?: 'Query', exercises: Array<{ __typename?: 'Exercise', id: string, name: string }> };

export type CreateWorkoutMutationVariables = Exact<{
  workout: CreateWorkoutInput;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout: { __typename?: 'Workout', id: string } };


export const ExerciseLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExerciseLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"exerciseLogId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exerciseLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"exerciseLogId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setNumber"}},{"kind":"Field","name":{"kind":"Name","value":"reps"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]}}]} as unknown as DocumentNode<ExerciseLogQuery, ExerciseLogQueryVariables>;
export const ExerciseLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSets"}},{"kind":"Field","name":{"kind":"Name","value":"minReps"}},{"kind":"Field","name":{"kind":"Name","value":"maxReps"}},{"kind":"Field","name":{"kind":"Name","value":"avgWeight"}}]}}]}}]}}]} as unknown as DocumentNode<ExerciseLogsQuery, ExerciseLogsQueryVariables>;
export const ExerciseForNewExerciseLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExerciseForNewExerciseLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSets"}},{"kind":"Field","name":{"kind":"Name","value":"minReps"}},{"kind":"Field","name":{"kind":"Name","value":"maxReps"}},{"kind":"Field","name":{"kind":"Name","value":"avgWeight"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ExerciseForNewExerciseLogQuery, ExerciseForNewExerciseLogQueryVariables>;
export const CreateExerciseLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExerciseLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"exerciseLog"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExerciseLogInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExerciseLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"exerciseLog"},"value":{"kind":"Variable","name":{"kind":"Name","value":"exerciseLog"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateExerciseLogMutation, CreateExerciseLogMutationVariables>;
export const ExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Exercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSets"}},{"kind":"Field","name":{"kind":"Name","value":"minReps"}},{"kind":"Field","name":{"kind":"Name","value":"maxReps"}},{"kind":"Field","name":{"kind":"Name","value":"avgWeight"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ExerciseQuery, ExerciseQueryVariables>;
export const ExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ExercisesQuery, ExercisesQueryVariables>;
export const ListExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ListExercisesQuery, ListExercisesQueryVariables>;
export const WorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Workout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<WorkoutQuery, WorkoutQueryVariables>;
export const WorkoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Workouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<WorkoutsQuery, WorkoutsQueryVariables>;
export const NewWorkoutPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NewWorkoutPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<NewWorkoutPageQuery, NewWorkoutPageQueryVariables>;
export const CreateWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workout"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workout"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workout"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateWorkoutMutation, CreateWorkoutMutationVariables>;