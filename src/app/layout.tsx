import Navbar from "@/components/home/navbar"
import Webgl from "@/components/webgl"
import '@/sass/podcast/index.scss'
import '@/sass/podcast/card.scss'
import '@/sass/music/index.scss'
import "./globals.scss";
import configuration from "@/config"
import Appoloprovider from "@/components/wrappers/appoloprovider"
import StoreProvider from "@/components/wrappers/StoreProvider"
import Share from "@/components/modals/share"
import { Inter } from "next/font/google";
import UserAuth from "@/components/wrappers/userAuth"
import MusicPlayer from "@/components/topComponent/musicPlayer"

export const metadata = {
  title: 'Leerecs - Podcasts',
    description: 'Alternative Rock, Alternative Music, Original Music, Independent Music, Original Tunes, Grunge, Rock Music, Colour Catalogues, New Friends, Musical Affinity, Music, New Artists, Independent Artists',
  openGraph: {
    title: 'Leerecs',
    description: 'Alternative Rock, Alternative Music, Original Music, Independent Music, Original Tunes, Grunge, Rock Music, Colour Catalogues, New Friends, Musical Affinity, Music, New Artists, Independent Artists',
    url: 'https://leerecs.com/podcast',
    siteName: 'leerecs.com',
    images: [
      {
        url: `${configuration.host}/assets/ico/logo.jpeg`, // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: `${configuration.host}/assets/ico/logo.jpeg`, // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}
const inter = Inter({ subsets: ["latin"] });
export default function PodcastLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
      <body className={inter.className}>
      <Appoloprovider>
        <StoreProvider>
        <UserAuth>
        <MusicPlayer/>
        <Share/>
        <section>
        <Webgl/>
        <Navbar/>
        {children}
      </section>
      </UserAuth>
    </StoreProvider>
    </Appoloprovider>
      </body>
      </html>
    )
  }