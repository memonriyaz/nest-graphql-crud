import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      name
      email
      userRole
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      name
      email
      userRole
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      name
      email
      userRole
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      _id
      name
      email
      userRole
    }
  }
`

export const REMOVE_USER = gql`
  mutation RemoveUser($id: String!) {
    removeUser(id: $id)
  }
`
