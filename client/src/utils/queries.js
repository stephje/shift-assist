import { gql } from '@apollo/client';

export const GET_ROLES = gql`
    query getRoles {
        roles {
            name
        }
    }
`;

export const GET_QUALIFICATIONS = gql`
    query getQualifications {
        qualifications {
            name
        }
    }
`;