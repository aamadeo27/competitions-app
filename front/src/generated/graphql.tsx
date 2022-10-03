import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const
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
  /** Competition delete */
  deleteCompetition: Competition;
  /** CompetitionMatch delete */
  deleteCompetitionMatch: CompetitionMatch;
  /** User delete */
  deleteUser: User;
  /** Competition update */
  updateCompetition: Competition;
  /** CompetitionMatch update */
  updateCompetitionMatch: CompetitionMatch;
  /** User update */
  updateUser: User;
};


export type MutationCreateCompetitionArgs = {
  competitionData: CreateCompetitionDto;
};


export type MutationCreateCompetitionMatchArgs = {
  matchData: CreateCompetitionMatchDto;
};


export type MutationDeleteCompetitionArgs = {
  competitionId: Scalars['BigInt'];
};


export type MutationDeleteCompetitionMatchArgs = {
  matchId: Scalars['BigInt'];
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

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  competitionId?: Maybe<Scalars['BigInt']>;
  discordId?: Maybe<Scalars['String']>;
  games?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  steamId: Scalars['ID'];
  twitchId?: Maybe<Scalars['String']>;
};

export type UserDto = {
  avatar: Scalars['String'];
  competitionId: Scalars['BigInt'];
  discordId: Scalars['String'];
  name: Scalars['String'];
  steamId: Scalars['String'];
  twitchId: Scalars['String'];
};

export type GetCompetitionByIdQueryVariables = Exact<{
  competitionId: Scalars['BigInt'];
}>;


export type GetCompetitionByIdQuery = { __typename?: 'Query', getCompetitionById: { __typename?: 'Competition', id: any, name: string, shortname: string, start?: any | null, matches?: Array<{ __typename?: 'CompetitionMatch', rounds: number, name: string, start?: any | null, results?: Array<{ __typename?: 'RoundResult', winner: string, order: number, details: string }> | null, player1: { __typename?: 'User', steamId: string, avatar: string, name: string, games?: number | null, score?: number | null }, player2: { __typename?: 'User', steamId: string, avatar: string, name: string, games?: number | null, score?: number | null } }> | null, players?: Array<{ __typename?: 'User', name: string, score?: number | null, games?: number | null, steamId: string, avatar: string }> | null } };

export type GetCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompetitionsQuery = { __typename?: 'Query', getCompetitions: Array<{ __typename?: 'Competition', id: any, name: string, shortname: string, start?: any | null, players?: Array<{ __typename?: 'User', name: string, score?: number | null, avatar: string }> | null, matches?: Array<{ __typename?: 'CompetitionMatch', start?: any | null, results?: Array<{ __typename?: 'RoundResult', id: any }> | null, player1: { __typename?: 'User', name: string, avatar: string }, player2: { __typename?: 'User', name: string, avatar: string } }> | null }> };


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
    `

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
  return Apollo.useQuery<GetCompetitionByIdQuery, GetCompetitionByIdQueryVariables>(GetCompetitionByIdDocument, options)
}
export function useGetCompetitionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompetitionByIdQuery, GetCompetitionByIdQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetCompetitionByIdQuery, GetCompetitionByIdQueryVariables>(GetCompetitionByIdDocument, options)
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
    `

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
  return Apollo.useQuery<GetCompetitionsQuery, GetCompetitionsQueryVariables>(GetCompetitionsDocument, options)
}
export function useGetCompetitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompetitionsQuery, GetCompetitionsQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetCompetitionsQuery, GetCompetitionsQueryVariables>(GetCompetitionsDocument, options)
}
export type GetCompetitionsQueryHookResult = ReturnType<typeof useGetCompetitionsQuery>;
export type GetCompetitionsLazyQueryHookResult = ReturnType<typeof useGetCompetitionsLazyQuery>;
export type GetCompetitionsQueryResult = Apollo.QueryResult<GetCompetitionsQuery, GetCompetitionsQueryVariables>;