export async function GET() {
    const res = await fetch(
        "https://leerecs.com/indexFile.json"
      );
      const data = await res.json()
   
    return Response.json({ data })
  }