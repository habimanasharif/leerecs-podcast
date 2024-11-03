import axios from 'axios'
import useAxios from 'axios-hooks'

const NEXT_PUBLIC_BASE_URL ="https://cms.leerecs.fm"
const NEXT_PUBLIC_AUTH_TOKEN="0d878cf8f6b76a4ee3d9244e16a1faa7b4b30c2bc5e6c28b96dcc24640acbd73370367eb6912454b71bb54b8aaf77a6a58a390b4e2bdbd44dd82747cb729a025d5cc8262dd5e9d2dd559ce133eea5c1ce9f4e80815e7f2a6c407048d325e5dfd455c1f35e19c01400d379cdd9618de9daec6af5a9a0f02d406463b2877f397f0"


const BASE = NEXT_PUBLIC_BASE_URL

const Routes = {
	artistslists: `${BASE}/api/artitstlists?populate=*`,
	heroes: `${BASE}/api/heroes?populate=*`,
	navbar_links: `${BASE}/api/navbar-links?populate=*`,
	social_medias: `${BASE}/api/social-medias?populate=*`,
	radios: `${BASE}/api/radios?populate=*`,
	alternative_music: `${BASE}/api/alternative-music?populate=*`,
	message_content: `${BASE}/api/message-content?populate=*`,
	artist: `${BASE}/api/artist?populate=*`,
	distribution: `${BASE}/api/distribibution?populate=*`,
	cta: `${BASE}/api/cta?populate=*`,
	podcast: `${BASE}/api/podcast?populate=*`,
	create_message: `${BASE}/api/messages`,
	testimonial: `${BASE}/api/testimonials?populate=*`,
}

const useFetcher= (url:string) => {
	const [{ data, loading, error }, refetch] = useAxios({
        url: url,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${NEXT_PUBLIC_AUTH_TOKEN}`
        }
    },{ useCache: true })
	console.log(error)
	return {data, loading, error}
}

const poster = async(url:string, data:'any') => {
	return await axios.post(url,data, {
		headers: {
            'Authorization': `Bearer ${NEXT_PUBLIC_AUTH_TOKEN}`
        }
	})
}

export { useFetcher, poster , BASE, Routes}