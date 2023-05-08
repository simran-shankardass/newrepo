import "../css/AlbumComponent.css";

function AlbumComponent({prop1, updateAggregator}) {

    return (
        <div class="main-wrapper" style={{backgroundColor: (!prop1.favourited ? "rgb(240,240,240)" : "rgb(241,211,255)")}}>
            <div class="album-wrapper">
                <img class="album-image" src={prop1.image}/>
                <div class="album-details">
                    <h3 class="album-name">{prop1.name}</h3>
                    <p class="artist-year">{prop1.artist}, {prop1.year}</p>
                    <p class="language">Language: {prop1.language}</p>
                    <p class="songs-length">{prop1.songs} songs, {prop1.minutes} minutes</p>
                    <p class="description">{prop1.description}</p>
                </div>
            </div>
            <div>
                <button style={{borderRadius:"0.5rem"}} onClick={() => {
                    updateAggregator(prop1.name, prop1.minutes, prop1.songs);
                    prop1.favourited = !prop1.favourited;
                }}>{!prop1.favourited ? "Favourite" : "Unfavourite"}</button>
            </div>
        </div>
    )
}

export default AlbumComponent;