import { gql } from '@apollo/client';

export const GET_ROLES = gql`
    query getRoles {
        getRoles {
            _id
            name
            label
            qualifications {
                name
            }
        }
    }
`;

export const GET_QUALIFICATIONS = gql`
    query getQualifications {
        getQualifications {
            _id
            name
            label
        }
    }
`;
