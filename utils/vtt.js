export function convertWebVTTToJsArray(webVTTString) {
    const lines = webVTTString.split('\n');
    const subtitles = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('WEBVTT')) continue; // skip the header
      if (line.startsWith('INTERVENANT')) continue; // skip the speaker info
  
      const parts = line.split(' --> ');
      if (parts.length !== 2) continue; // skip invalid lines
  
      console.log(parts)
      const [start, end] = parts.map(part => part.trim());

      let text = lines[i + 1].trim(); // get the text content
      if (i + 2 < lines.length && lines[i + 2] != '\n') {
        text += " " + lines[i + 2].trim()
      }
  
      subtitles.push([start + ' --> ' + end, text ]);
    }
  
    return subtitles;
  }