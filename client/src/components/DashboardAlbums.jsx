import React, { useEffect } from 'react'
import { useStateValue } from '../Context/StateProvider'
import { getAllAlbums } from '../api';
import Songcard from './Songcard';
import { actionType } from '../Context/reducer';

const DashboardAlbums = () => {
    const [{ allAlbums }, dispatch] = useStateValue();
    useEffect(() => {
        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.data
                })
            })
        }
    }, []);
    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <div className='relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md'>
                <AlbumContainer data={allAlbums} />
            </div>
        </div>
    )
}
export const AlbumContainer = ({ data }) => {
    console.log(data);
    return (
        <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
            {data && data.map((song, i) =>
                <Songcard key={song._id} data={song} index={i} type="album" />
            )}
        </div>


    );
}

export default DashboardAlbums