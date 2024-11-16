import Parser from 'rss-parser';
import NodeCache from 'node-cache';

const parser = new Parser();
const cache = new NodeCache({ stdTTL: 86400 }); // Cache for 1 day
const FEED_URL = "https://www.spreaker.com/show/3073366/episodes/feed";

interface Feed {
  title: string;
  items: Array<{ title: string; link: string; pubDate: string }>;
}

const fetchRSSFeed = async (url: string): Promise<Feed> => {
  try {
    const cachedFeed = cache.get<any>(url);
    if (cachedFeed) {
      return cachedFeed.items.map((item:any)=>{
      
        return {
         imageUrl: item.itunes.image,
         musicUrl: item.enclosure?.url,
         artist: "leerecs",
         musicName: item.title,
         description: item.contentSnippet,
             }
       });
    }

    const feed: any = await parser.parseURL(url);
    cache.set(url, feed);
    return feed.items.map((item:any,index:number)=>{
      
     return {
      imageUrl: item.itunes.image,
      musicUrl: item.enclosure?.url,
      artist: "leerecs",
      musicName: item.title,
      description: item.contentSnippet,
          }
    });
  } catch (error) {
    throw new Error('Failed to fetch RSS feed');
  }
};


export async function GET() {
    const feed = await fetchRSSFeed( FEED_URL)
    
   
    return Response.json({ data:feed })
  }

