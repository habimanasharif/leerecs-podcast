import SmallLoader from "../../../public/icons/loaders/smallLoader"
import '@/sass/loaders/preloader.scss'

export default function Preloader() {
    return (
        <div className="col-md-3 px-0 card preloader">
            <div className='h-100 d-flex justify-content-center align-items-center'><SmallLoader/></div>
        </div>
    )
}