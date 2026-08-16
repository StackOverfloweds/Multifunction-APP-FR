import { gql } from '@apollo/client/core'

/**
 * Semua operasi GraphQL untuk modul autentikasi.
 *
 * Disimpan terpusat di sini (bukan ditulis ulang di tiap komponen) supaya:
 * 1. Field yang diminta ke backend konsisten di semua tempat yang memakainya.
 * 2. Kalau schema backend (graphql/schema.graphql) berubah, cukup diupdate
 *    di satu file ini, tidak perlu grep ke seluruh komponen.
 *
 * Lihat definisi tipe & resolver aslinya di backend:
 * - graphql/schema.graphql (type Mutation / type Query)
 * - app/GraphQL/Mutations/AuthMutator.php
 */

export const AUTH_PAYLOAD_FIELDS = gql`
  fragment AuthPayloadFields on AuthPayload {
    token
    tokenType
    expiresIn
    user {
      id
      username
      email
      role
    }
  }
`

export const LOGIN_MUTATION = gql`
  ${AUTH_PAYLOAD_FIELDS}
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...AuthPayloadFields
    }
  }
`

export const REGISTER_MUTATION = gql`
  ${AUTH_PAYLOAD_FIELDS}
  mutation Register(
    $username: String!
    $email: String
    $password: String!
    $passwordConfirmation: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      ...AuthPayloadFields
    }
  }
`

export const REFRESH_TOKEN_MUTATION = gql`
  ${AUTH_PAYLOAD_FIELDS}
  mutation RefreshToken {
    refreshToken {
      ...AuthPayloadFields
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      role
    }
  }
`
