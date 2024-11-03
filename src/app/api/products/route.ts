import Parser from 'rss-parser';
import NodeCache from 'node-cache';
import configuration from '@/config';

const parser = new Parser();
const cache = new NodeCache({ stdTTL: 86400 }); // Cache for 1 day

interface Feed {
  title: string;
  items: Array<{ title: string; link: string; pubDate: string }>;
}

const fetchProduts = async (url: string): Promise<Feed> => {
  try {
    const cachedFeed = cache.get<any>(url);
    if (cachedFeed) {
      return cachedFeed
    }

    const res=await fetch(`${configuration.BACK_END_HOST}${url}`);
    const data = await res.json()
    cache.set(url, data);
    return data
  } catch (error) {
    throw new Error('Failed to fetch RSS feed');
  }
};


export async function GET() {
    const feed = await fetchProduts('/shop/products')
    
   
    return Response.json({ data:feed })
  }


