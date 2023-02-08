import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  DateTime: any;
};

export type Competition = {
  __typename?: 'Competition';
  id: Scalars['BigInt'];
  matches?: Maybe<Array<CompetitionMatch>>;
  name: Scalars['String'];
  players?: Maybe<Array<User>>;
  shortname: Scalars['String'];
  start?: Maybe<Scalars['DateTime']>;
};

export type CompetitionMatch = {
  __typename?: 'CompetitionMatch';
  competitionId: Scalars['BigInt'];
  competitor1: Scalars['String'];
  competitor2: Scalars['String'];
  end?: Maybe<Scalars['DateTime']>;
  id: Scalars['BigInt'];
  name: Scalars['String'];
  phase: Scalars['Float'];
  player1: User;
  player2: User;
  results?: Maybe<Array<RoundResult>>;
  rounds: Scalars['Float'];
  start?: Maybe<Scalars['DateTime']>;
};

export type CreateCompetitionDto = {
  name: Scalars['String'];
  shortname: Scalars['String'];
  start: Scalars['DateTime'];
};

export type CreateCompetitionMatchDto = {
  competitionId: Scalars['BigInt'];
  competitor1: Scalars['String'];
  competitor2: Scalars['String'];
  name: Scalars['String'];
  phase: Scalars['Float'];
  start: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Competition create */
  createCompetition: Competition;
  /** CompetitionMatch create */
  createCompetitionMatch: CompetitionMatch;
  /** TimeFrame create */
  createTimeFrame: TimeFrame;
  /** Competition delete */
  deleteCompetition: Competition;
  /** CompetitionMatch delete */
  deleteCompetitionMatch: CompetitionMatch;
  /** TimeFrame delete */
  deleteTimeFrame: TimeFrame;
  /** User delete */
  deleteUser: User;
  /** Competition update */
  updateCompetition: Competition;
  /** CompetitionMatch update */
  updateCompetitionMatch: CompetitionMatch;
  /** TimeFrame update */
  updateTimeFrame: TimeFrame;
  /** User update */
  updateUser: User;
};


export type MutationCreateCompetitionArgs = {
  competitionData: CreateCompetitionDto;
};


export type MutationCreateCompetitionMatchArgs = {
  matchData: CreateCompetitionMatchDto;
};


export type MutationCreateTimeFrameArgs = {
  data: TimeFrameDto;
};


export type MutationDeleteCompetitionArgs = {
  competitionId: Scalars['BigInt'];
};


export type MutationDeleteCompetitionMatchArgs = {
  matchId: Scalars['BigInt'];
};


export type MutationDeleteTimeFrameArgs = {
  id: Scalars['BigInt'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateCompetitionArgs = {
  competitionData: CreateCompetitionDto;
  competitionId: Scalars['BigInt'];
};


export type MutationUpdateCompetitionMatchArgs = {
  matchData: CreateCompetitionMatchDto;
  matchId: Scalars['BigInt'];
};


export type MutationUpdateTimeFrameArgs = {
  data: TimeFrameDto;
  id: Scalars['BigInt'];
};


export type MutationUpdateUserArgs = {
  userData: UserDto;
};

export type Query = {
  __typename?: 'Query';
  /** Competition find by id */
  getCompetitionById: Competition;
  /** CompetitionMatch find by id */
  getCompetitionMatchById: CompetitionMatch;
  /** CompetitionMatch find list */
  getCompetitionMatches: Array<CompetitionMatch>;
  /** CompetitionMatch list by date range */
  getCompetitionMatchesInDateRange: Array<CompetitionMatch>;
  /** Competition find list */
  getCompetitions: Array<Competition>;
  /** User find by id */
  getUserById: User;
  /** User find list */
  getUsers: Array<User>;
  /** Users find by competitionId */
  getUsersInCompetition: Array<User>;
};


export type QueryGetCompetitionByIdArgs = {
  competitionId: Scalars['BigInt'];
};


export type QueryGetCompetitionMatchByIdArgs = {
  matchId: Scalars['BigInt'];
};


export type QueryGetCompetitionMatchesArgs = {
  competitionId: Scalars['BigInt'];
};


export type QueryGetCompetitionMatchesInDateRangeArgs = {
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUsersInCompetitionArgs = {
  competitionId?: InputMaybe<Scalars['BigInt']>;
};

export type RoundResult = {
  __typename?: 'RoundResult';
  details: Scalars['String'];
  id: Scalars['BigInt'];
  matchId: Scalars['BigInt'];
  order: Scalars['Float'];
  winner: Scalars['String'];
};

export type TimeFrame = {
  __typename?: 'TimeFrame';
  canPlay: Scalars['Boolean'];
  days: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  end: Scalars['Float'];
  id: Scalars['BigInt'];
  start: Scalars['Float'];
  userId: Scalars['String'];
  validSince?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
};

export type TimeFrameDto = {
  canPlay: Scalars['Boolean'];
  days: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  end: Scalars['Float'];
  start: Scalars['Float'];
  userId: Scalars['String'];
  validSince?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type User = {
  __typename?: 'User';
  availability?: Maybe<Array<TimeFrame>>;
  avatar: Scalars['String'];
  competitionId?: Maybe<Scalars['BigInt']>;
  discordId?: Maybe<Scalars['String']>;
  games?: Maybe<Scalars['Float']>;
  matches?: Maybe<Array<CompetitionMatch>>;
  name: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  steamId: Scalars['ID'];
  twitchId?: Maybe<Scalars['String']>;
};

export type UserDto = {
  avatar?: InputMaybe<Scalars['String']>;
  competitionId?: InputMaybe<Scalars['BigInt']>;
  discordId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  steamId: Scalars['String'];
  twitchId?: InputMaybe<Scalars['String']>;
};

export type GetCompetitionByIdQueryVariables = Exact<{
  competitionId: Scalars['BigInt'];
}>;


export type GetCompetitionByIdQuery = { __typename?: 'Query', getCompetitionById: { __typename?: 'Competition', id: any, name: string, shortname: string, start?: any | null, matches?: Array<{ __typename?: 'CompetitionMatch', rounds: number, name: string, start?: any | null, results?: Array<{ __typename?: 'RoundResult', winner: string, order: number, details: string }> | null, player1: { __typename?: 'User', steamId: string, avatar: string, name: string, games?: number | null, score?: number | null }, player2: { __typename?: 'User', steamId: string, avatar: string, name: string, games?: number | null, score?: number | null } }> | null, players?: Array<{ __typename?: 'User', name: string, score?: number | null, games?: number | null, steamId: string, avatar: string }> | null } };

export type GetCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompetitionsQuery = { __typename?: 'Query', getCompetitions: Array<{ __typename?: 'Competition', id: any, name: string, shortname: string, start?: any | null, players?: Array<{ __typename?: 'User', name: string, score?: number | null, avatar: string }> | null, matches?: Array<{ __typename?: 'CompetitionMatch', start?: any | null, results?: Array<{ __typename?: 'RoundResult', id: any }> | null, player1: { __typename?: 'User', name: string, avatar: string }, player2: { __typename?: 'User', name: string, avatar: string } }> | null }> };

export type GetCompetitionMatchesInDateRangeQueryVariables = Exact<{
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
}>;


export type GetCompetitionMatchesInDateRangeQuery = { __typename?: 'Query', getCompetitionMatchesInDateRange: Array<{ __typename?: 'CompetitionMatch', id: any, competitionId: any, phase: number, name: string, rounds: number, competitor1: string, competitor2: string, start?: any | null, end?: any | null, player1: { __typename?: 'User', steamId: string, name: string, avatar: string }, player2: { __typename?: 'User', steamId: string, name: string, avatar: string }, results?: Array<{ __typename?: 'RoundResult', id: any, matchId: any, order: number, winner: string, details: string }> | null }> };

export type GetRivalsQueryVariables = Exact<{
  competitionId: Scalars['BigInt'];
}>;


export type GetRivalsQuery = { __typename?: 'Query', getCompetitionById: { __typename?: 'Competition', id: any, players?: Array<{ __typename?: 'User', name: string, steamId: string, avatar: string }> | null } };

export type CreateTimeFrameMutationVariables = Exact<{
  data: TimeFrameDto;
}>;


export type CreateTimeFrameMutation = { __typename?: 'Mutation', createTimeFrame: { __typename?: 'TimeFrame', userId: string, id: any, description?: string | null, days: string, start: number, end: number, canPlay: boolean, validSince?: any | null, validUntil?: any | null } };

export type DeleteTimeFrameMutationVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type DeleteTimeFrameMutation = { __typename?: 'Mutation', deleteTimeFrame: { __typename?: 'TimeFrame', id: any } };

export type UpdateTimeFrameMutationVariables = Exact<{
  id: Scalars['BigInt'];
  data: TimeFrameDto;
}>;


export type UpdateTimeFrameMutation = { __typename?: 'Mutation', updateTimeFrame: { __typename?: 'TimeFrame', userId: string, id: any, description?: string | null, days: string, start: number, end: number, canPlay: boolean, validSince?: any | null, validUntil?: any | null } };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', steamId: string, name: string, avatar: string, competitionId?: any | null, matches?: Array<{ __typename?: 'CompetitionMatch', id: any, competitionId: any, phase: number, name: string, rounds: number, start?: any | null, end?: any | null, player1: { __typename?: 'User', steamId: string, name: string, avatar: string }, player2: { __typename?: 'User', steamId: string, name: string, avatar: string }, results?: Array<{ __typename?: 'RoundResult', id: any, order: number, winner: string, details: string }> | null }> | null, availability?: Array<{ __typename?: 'TimeFrame', userId: string, id: any, days: string, description?: string | null, start: number, end: number, canPlay: boolean, validSince?: any | null, validUntil?: any | null }> | null } };

export type UpdateUserMutationVariables = Exact<{
  userData: UserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', steamId: string } };


export const GetCompetitionByIdDocument = gql`
    query GetCompetitionById($competitionId: BigInt!) {
  getCompetitionById(competitionId: $competitionId) {
    id
    name
    shortname
    start
    matches {
      rounds
      name
      results {
        winner
      }
      player1 {
        steamId
        avatar
        name
        games
        score
      }
      player2 {
        steamId
        avatar
        name
        games
        score
      }
      start
      results {
        order
        winner
        details
      }
    }
    players {
      name
      score
      games
      steamId
      avatar
    }
  }
}
    `;

/**
 * __useGetCompetitionByIdQuery__
 *
 * To run a query within a React component, call `useGetCompetitionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompetitionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompetitionByIdQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useGetCompetitionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCompetitionByIdQuery, GetCompetitionByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompetitionByIdQuery, GetCompetitionByIdQueryVariables>(GetCompetitionByIdDocument, options);
      }
export function useGetCompetitionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompetitionByIdQuery, GetCompetitionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompetitionByIdQuery, GetCompetitionByIdQueryVariables>(GetCompetitionByIdDocument, options);
        }
export type GetCompetitionByIdQueryHookResult = ReturnType<typeof useGetCompetitionByIdQuery>;
export type GetCompetitionByIdLazyQueryHookResult = ReturnType<typeof useGetCompetitionByIdLazyQuery>;
export type GetCompetitionByIdQueryResult = Apollo.QueryResult<GetCompetitionByIdQuery, GetCompetitionByIdQueryVariables>;
export const GetCompetitionsDocument = gql`
    query GetCompetitions {
  getCompetitions {
    id
    name
    shortname
    start
    players {
      name
      score
      avatar
    }
    matches {
      start
      results {
        id
      }
      player1 {
        name
        avatar
      }
      player2 {
        name
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetCompetitionsQuery__
 *
 * To run a query within a React component, call `useGetCompetitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompetitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompetitionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompetitionsQuery(baseOptions?: Apollo.QueryHookOptions<GetCompetitionsQuery, GetCompetitionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompetitionsQuery, GetCompetitionsQueryVariables>(GetCompetitionsDocument, options);
      }
export function useGetCompetitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompetitionsQuery, GetCompetitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompetitionsQuery, GetCompetitionsQueryVariables>(GetCompetitionsDocument, options);
        }
export type GetCompetitionsQueryHookResult = ReturnType<typeof useGetCompetitionsQuery>;
export type GetCompetitionsLazyQueryHookResult = ReturnType<typeof useGetCompetitionsLazyQuery>;
export type GetCompetitionsQueryResult = Apollo.QueryResult<GetCompetitionsQuery, GetCompetitionsQueryVariables>;
export const GetCompetitionMatchesInDateRangeDocument = gql`
    query GetCompetitionMatchesInDateRange($end: DateTime!, $start: DateTime!) {
  getCompetitionMatchesInDateRange(end: $end, start: $start) {
    id
    competitionId
    phase
    name
    rounds
    competitor1
    competitor2
    player1 {
      steamId
      name
      avatar
    }
    player2 {
      steamId
      name
      avatar
    }
    start
    end
    results {
      id
      matchId
      order
      winner
      details
    }
  }
}
    `;

/**
 * __useGetCompetitionMatchesInDateRangeQuery__
 *
 * To run a query within a React component, call `useGetCompetitionMatchesInDateRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompetitionMatchesInDateRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompetitionMatchesInDateRangeQuery({
 *   variables: {
 *      end: // value for 'end'
 *      start: // value for 'start'
 *   },
 * });
 */
export function useGetCompetitionMatchesInDateRangeQuery(baseOptions: Apollo.QueryHookOptions<GetCompetitionMatchesInDateRangeQuery, GetCompetitionMatchesInDateRangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompetitionMatchesInDateRangeQuery, GetCompetitionMatchesInDateRangeQueryVariables>(GetCompetitionMatchesInDateRangeDocument, options);
      }
export function useGetCompetitionMatchesInDateRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompetitionMatchesInDateRangeQuery, GetCompetitionMatchesInDateRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompetitionMatchesInDateRangeQuery, GetCompetitionMatchesInDateRangeQueryVariables>(GetCompetitionMatchesInDateRangeDocument, options);
        }
export type GetCompetitionMatchesInDateRangeQueryHookResult = ReturnType<typeof useGetCompetitionMatchesInDateRangeQuery>;
export type GetCompetitionMatchesInDateRangeLazyQueryHookResult = ReturnType<typeof useGetCompetitionMatchesInDateRangeLazyQuery>;
export type GetCompetitionMatchesInDateRangeQueryResult = Apollo.QueryResult<GetCompetitionMatchesInDateRangeQuery, GetCompetitionMatchesInDateRangeQueryVariables>;
export const GetRivalsDocument = gql`
    query GetRivals($competitionId: BigInt!) {
  getCompetitionById(competitionId: $competitionId) {
    id
    players {
      name
      steamId
      avatar
    }
  }
}
    `;

/**
 * __useGetRivalsQuery__
 *
 * To run a query within a React component, call `useGetRivalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRivalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRivalsQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useGetRivalsQuery(baseOptions: Apollo.QueryHookOptions<GetRivalsQuery, GetRivalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRivalsQuery, GetRivalsQueryVariables>(GetRivalsDocument, options);
      }
export function useGetRivalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRivalsQuery, GetRivalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRivalsQuery, GetRivalsQueryVariables>(GetRivalsDocument, options);
        }
export type GetRivalsQueryHookResult = ReturnType<typeof useGetRivalsQuery>;
export type GetRivalsLazyQueryHookResult = ReturnType<typeof useGetRivalsLazyQuery>;
export type GetRivalsQueryResult = Apollo.QueryResult<GetRivalsQuery, GetRivalsQueryVariables>;
export const CreateTimeFrameDocument = gql`
    mutation CreateTimeFrame($data: TimeFrameDto!) {
  createTimeFrame(data: $data) {
    userId
    id
    description
    days
    start
    end
    canPlay
    validSince
    validUntil
  }
}
    `;
export type CreateTimeFrameMutationFn = Apollo.MutationFunction<CreateTimeFrameMutation, CreateTimeFrameMutationVariables>;

/**
 * __useCreateTimeFrameMutation__
 *
 * To run a mutation, you first call `useCreateTimeFrameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimeFrameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimeFrameMutation, { data, loading, error }] = useCreateTimeFrameMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTimeFrameMutation(baseOptions?: Apollo.MutationHookOptions<CreateTimeFrameMutation, CreateTimeFrameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTimeFrameMutation, CreateTimeFrameMutationVariables>(CreateTimeFrameDocument, options);
      }
export type CreateTimeFrameMutationHookResult = ReturnType<typeof useCreateTimeFrameMutation>;
export type CreateTimeFrameMutationResult = Apollo.MutationResult<CreateTimeFrameMutation>;
export type CreateTimeFrameMutationOptions = Apollo.BaseMutationOptions<CreateTimeFrameMutation, CreateTimeFrameMutationVariables>;
export const DeleteTimeFrameDocument = gql`
    mutation DeleteTimeFrame($id: BigInt!) {
  deleteTimeFrame(id: $id) {
    id
  }
}
    `;
export type DeleteTimeFrameMutationFn = Apollo.MutationFunction<DeleteTimeFrameMutation, DeleteTimeFrameMutationVariables>;

/**
 * __useDeleteTimeFrameMutation__
 *
 * To run a mutation, you first call `useDeleteTimeFrameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTimeFrameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTimeFrameMutation, { data, loading, error }] = useDeleteTimeFrameMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTimeFrameMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTimeFrameMutation, DeleteTimeFrameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTimeFrameMutation, DeleteTimeFrameMutationVariables>(DeleteTimeFrameDocument, options);
      }
export type DeleteTimeFrameMutationHookResult = ReturnType<typeof useDeleteTimeFrameMutation>;
export type DeleteTimeFrameMutationResult = Apollo.MutationResult<DeleteTimeFrameMutation>;
export type DeleteTimeFrameMutationOptions = Apollo.BaseMutationOptions<DeleteTimeFrameMutation, DeleteTimeFrameMutationVariables>;
export const UpdateTimeFrameDocument = gql`
    mutation UpdateTimeFrame($id: BigInt!, $data: TimeFrameDto!) {
  updateTimeFrame(id: $id, data: $data) {
    userId
    id
    description
    days
    start
    end
    canPlay
    validSince
    validUntil
  }
}
    `;
export type UpdateTimeFrameMutationFn = Apollo.MutationFunction<UpdateTimeFrameMutation, UpdateTimeFrameMutationVariables>;

/**
 * __useUpdateTimeFrameMutation__
 *
 * To run a mutation, you first call `useUpdateTimeFrameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimeFrameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimeFrameMutation, { data, loading, error }] = useUpdateTimeFrameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTimeFrameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTimeFrameMutation, UpdateTimeFrameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTimeFrameMutation, UpdateTimeFrameMutationVariables>(UpdateTimeFrameDocument, options);
      }
export type UpdateTimeFrameMutationHookResult = ReturnType<typeof useUpdateTimeFrameMutation>;
export type UpdateTimeFrameMutationResult = Apollo.MutationResult<UpdateTimeFrameMutation>;
export type UpdateTimeFrameMutationOptions = Apollo.BaseMutationOptions<UpdateTimeFrameMutation, UpdateTimeFrameMutationVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($userId: String!) {
  getUserById(userId: $userId) {
    steamId
    name
    avatar
    competitionId
    matches {
      id
      competitionId
      phase
      name
      rounds
      player1 {
        steamId
        name
        avatar
      }
      player2 {
        steamId
        name
        avatar
      }
      start
      end
      results {
        id
        order
        winner
        details
      }
    }
    availability {
      userId
      id
      days
      description
      start
      end
      canPlay
      validSince
      validUntil
    }
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userData: UserDto!) {
  updateUser(userData: $userData) {
    steamId
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;