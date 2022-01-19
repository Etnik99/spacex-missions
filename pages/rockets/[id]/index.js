import { gql } from "@apollo/client";
import client from "../../../apollo-client";

const Rocket = ({ rocket }) => {
    return (
        <>
            <h1>{rocket.name}</h1>
            <h1>{rocket.type}</h1>
            <h1>{rocket.description}</h1>
            <h1>{rocket.country}</h1>
        </>
    )
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: gql`
          query Rockets {
            launchesPast(limit: 10) {
              rocket {
                rocket {
                  id
                }
              }
            }
          }
        `,
    });

    const paths = data.launchesPast.map(({ rocket }) => ({ params: { id: rocket.rocket.id }, }))

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {

    const { data } = await client.query({
        query: gql`
          query Rocket($id: ID!){
            rocket(id: $id) {
                name
                type
                description
                country
            }
          }
        `,
        variables: { id: params.id },
    });

    return {
        props: {
            rocket: data.rocket,
        }
    }
}
export default Rocket;