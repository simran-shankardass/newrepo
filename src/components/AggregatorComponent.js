import "../css/AggregatorComponent.css";

function AggregatorComponent({totalMinutes, totalSongs, aggregator}) {

    return (
        <div class="aggregator-wrapper">
            <h3 class="aggregator-header">FAVOURITES</h3>
            <ol class="fav-list">
                {aggregator.map((item) => (
                   <li>{item}</li>
                ))}
            </ol>
            <p class="total">Total minutes of music: {totalMinutes}</p>
            <p class="total">Total songs: {totalSongs}</p>
        </div>
    )
}

export default AggregatorComponent;