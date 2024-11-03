import configuration from "@/config";
import { GET_USER_INFO } from "../graphql/queries";
export async function GET() {
    const res = await fetch(configuration.GRAPHQL_SERVER_LINK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query:`query($playListId:String!){
  SinglePlaylistData(playListId:$playListId){
    title
	    desc
	    cover
        playListId
        userId
        coverId
  }
  }`,
          variables: { playListId:"True Alternative" },
        }),
      });
          const data = await res.json()
       
        return Response.json({ data })
      }