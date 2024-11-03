import configuration from "@/config";
export async function GET() {
    const res = await fetch(`${configuration.BACK_END_HOST}/allplatiform`);
          const data = await res.json()
       
        return Response.json({ data })
      }