export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url"); // Récupérer l'URL du fichier VTT
  
    if (!url) {
      return new Response(JSON.stringify({ error: "Missing URL parameter" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
  
      const data = await response.text();
      return new Response(data, {
        status: 200,
        headers: { "Content-Type": "text/vtt" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to load subtitles" }), { 
        status: 500, 
        headers: { "Content-Type": "application/json" }
      });
    }
}
