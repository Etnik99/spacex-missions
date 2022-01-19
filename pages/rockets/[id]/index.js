import { gql } from "@apollo/client";
import client from "../../../apollo-client";

const Rocket = ({ rocket }) => {
  return (
    <>
      <div className="rocket-infos">
        <p id='rocket-info'><span>Rocket Country: </span>{rocket.country}</p>
        <p id='rocket-info'><span>Rocket Name: </span>{rocket.name}</p>
        <p id='rocket-info'><span>Rocket Type: </span>{rocket.type}</p>
        <span>Rocket Info:</span>
        <p id='rocket-description'>{rocket.description}</p>
      </div>

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