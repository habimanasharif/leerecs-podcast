import React from "react";
import Player from "../../../public/icons/player";
import Link from "next/link";
import CardShareIcon from "../../../public/icons/cardShareIcon";
import "@/sass/music/artistElement.scss";
import configuration from "@/config";
import { usePlayer } from "@/lib/usePlayer";
import Image from "next/image";
import CustomImage from "../wrappers/customImage";
interface props {
  artistName: string;
  artistProfile: string;
  userId: number;
}
const ArtistElement: React.FC<props> = ({
  artistName,
  artistProfile,
  userId,
}: props) => {
  const handleError = (event: any) => {
    event.target.src = `${configuration.host}/assets/images/thumb_avatar-default-image.jpg`;
  };
  const [{ playArtist }] = usePlayer();
  return (
    <div
      className="col-md-3 px-3 py-2 card card mt-3 music-e-card  shadow-sm"
      style={{ backgroundColor: "#1e1e1e" }}
    >
      <div className="artist">
        <Link
          href={`/a/${artistName
            .replaceAll(" ", "-")
            .toLowerCase()
            .replaceAll("/", "")}`}
        >
          <div className="artist-wrapper">
            <div>
              <Image
                alt="thumbnail"
                className="artist-img"
                src={`${configuration.FILE_STORAGE_LINK}${artistProfile}`}
                width={500}
                height={500}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              <CustomImage
              alt="thumbnail"
              className="artist-img"
              src={`${configuration.FILE_STORAGE_LINK}${artistProfile}`}
              fallbackSrc="https://res.cloudinary.com/dxkrgura6/image/upload/leerecs/default-music.png"

              />
            </div>
          </div>
        </Link>
        <div
          className="music-play-btn-artist"
          onClick={() => {
            playArtist(userId);
          }}
        >
          <Player />
        </div>
      </div>

      <div className="artist-name">
        <Link
          href={`/a/${artistName
            .replaceAll(" ", "-")
            .toLowerCase()
            .replaceAll("/", "")}`}
          style={{ color: "#fff" }}
        >
          <div title={artistName} className="artist-names">
            {artistName}
          </div>
        </Link>
        <div className="mt-2 artist-type" title={artistName}>
          Musician
        </div>
        <div className="card-share-btn">
          <CardShareIcon></CardShareIcon>
        </div>
      </div>
    </div>
  );
};

export default ArtistElement;
