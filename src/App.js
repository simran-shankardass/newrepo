import "./App.css";
import { useEffect, useState } from "react";
import albumData from "./assets/album-data.json";
import Checkbox from "./components/Checkbox";
import RadioButton from "./components/RadioButton";
import AlbumComponent from "./components/AlbumComponent";
import AggregatorComponent from "./components/AggregatorComponent";

function App() {

    //Aggregator (minutes, songs)
    const [aggregator, setAggregator] = useState([]);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalSongs, setTotalSongs] = useState(0);

    // For filtering by artist name
    const [BTS, setBTS] = useState(false);
    const [taylor, setTaylor] = useState(false);
    const [RM, setRM] = useState(false);
    const [hozier, setHozier] = useState(false);
    const [harry, setHarry] = useState(false);
    const [variousArtist, setVariousArtist] = useState(false);
  
    // For filtering by album language
    const [english, setEnglish] = useState(false);
    const [korean, setKorean] = useState(false);
    const [variousLang, setVariousLang] = useState(false);

    // For sorting
    const [sortType, setSortType] = useState("AlphabeticalArtist");
    
    // List
    const [list, setList] = useState(albumData);


    // use effect??
    useEffect( () => {
        setList(filteredAndSortedData);
    })

    /**AGGREGATOR */
    // Aggregrate minutes and songs 

    //Minute aggregator function
    const handleRemoveFromAggregator = (itemName) => {
        const newAggregator = aggregator.filter((item) => item !== itemName);
        setAggregator(newAggregator);
    }

    //Length aggregator function
    const addToAggregator = (itemName, itemMinutes, itemSongs) => {
        if (aggregator.includes(itemName)) {
            handleRemoveFromAggregator(itemName);
            setTotalMinutes(totalMinutes - itemMinutes);
            setTotalSongs(totalSongs - itemSongs);
        } else {
            setAggregator([...aggregator, itemName]);
            setTotalMinutes(totalMinutes + itemMinutes);
            setTotalSongs(totalSongs + itemSongs);
        }
    }

    /**FILTERING */
    // FILTER BY: artist name, language

    // For album filtering by artist
    const handleChangeBTS = e => {
        setBTS(!BTS);
    }
    const handleChangeTaylor = e => {
        setTaylor(!taylor);
    }
    const handleChangeRM = e => {
        setRM(!RM);
    }
    const handleChangeHozier = e => {
        setHozier(!hozier);
    }
    const handleChangeHarry = e => {
        setHarry(!harry);
    }
    const handleChangeVariousArtist = e => {
        setVariousArtist(!variousArtist);
    }

    // For album filtering by language
    const handleChangeEnglish = e => {
        setEnglish(!english);
    }
    const handleChangeKorean = e => {
        setKorean(!korean);
    }
    const handleChangeVariousLang = e => {
        setVariousLang(!variousLang);
    }
    
    // artist
    const matchesFilterArtist = (item, artistStateVariable, artistName) => {
        if (artistStateVariable) {
            if (item.artist === artistName) {
                return true;
            } else {
                return false;
            }
        }
    }

    // language
    const matchesFilterLanguage = (item, langStateVariable, language) => {
        if (langStateVariable) {
            if (item.language === language) {
                return true;
            } else {
                return false;
            }
        }
    }

    // artist filters with OR - if 2 clicked, both artists show
    const applyArtistFilters = (item) => {
        return (
            (matchesFilterArtist(item, BTS, "BTS")) || 
            (matchesFilterArtist(item, taylor, "Taylor Swift")) ||
            (matchesFilterArtist(item, RM, "RM")) ||
            (matchesFilterArtist(item, hozier, "Hozier")) ||
            (matchesFilterArtist(item, harry, "Harry Styles")) ||
            (matchesFilterArtist(item, variousArtist, "Various Artists")));
    }

    // language filters with OR - if 2 clicked, both languages show
    const applyLanguageFilters = (item) => {
        return (
            (matchesFilterLanguage(item, english, "English")) ||
            (matchesFilterLanguage(item, korean, "Korean")) ||
            (matchesFilterLanguage(item, variousLang, "Various Languages"))
        );
    }

    // apply both filters
    const filteredData = albumData.filter(item => {
        // if nothing clicked
        if (!BTS && !taylor && !RM && !hozier && !harry && !variousArtist && !english && !korean && !variousLang) {
            return true;

        // if any one is clicked
        } else {

            // if no language filters, apply just artist filters
            if (!english && !korean && !variousLang) {
                return applyArtistFilters(item);
            
            // if no artist filters, apply just language filters
            } else if (!BTS && !taylor && !RM && !hozier && !harry && !variousArtist) {
                return applyLanguageFilters(item);
            }

            // if at least one from each, apply both with AND - both should return true for it to show
            else {
                return (applyArtistFilters(item) && applyLanguageFilters(item));
            }
        }
    })

    /**SORTING */
    //SORT: newest to oldest (descending year), oldest to newest (ascending year), aplhabetical (album name), alphabetical (artist)

    const onOptionChange = e => {
        setSortType(e.target.value)
    }

    const filteredAndSortedData = filteredData.sort((a, b) => {
        if (sortType === "AscendingYear") {
            return a.year - b.year;
        } else if (sortType === "DescendingYear") {
            return b.year - a.year;
        } else if (sortType === "AlphabeticalName") {
            return a.name > b.name ? 1 : -1;
        } else if (sortType === "AlphabeticalArtist") {
            return ((a.artist >= b.artist)) ? 1 : -1;
        }
    })

    const resetFiltersAndSort = () => {
        setBTS(false);
        setTaylor(false);
        setRM(false);
        setHarry(false);
        setHozier(false);
        setVariousArtist(false);
        setEnglish(false);
        setKorean(false);
        setVariousLang(false);
        setSortType("AlphabeticalArtist");
    }

    // To be rendered
    return (
        <div className="App">
            <h1>My Albums</h1>

            <div class="main-content">

                <div class="sidebar">
                    <div class="display-options">
                        <div class="filter-container">
                            <h3 class="display-method">FILTER</h3>

                            <h4 class="filter-type">By Artist</h4>
                            <div class="display-buttons">
                                <Checkbox id="1" name="BTS" title="BTS" checked={BTS} handleChange={handleChangeBTS}/>
                                <Checkbox id="2" name="taylor" title="Taylor Swift" checked={taylor} handleChange={handleChangeTaylor}/>
                                <Checkbox id="3" name="RM" title="RM" checked={RM} handleChange={handleChangeRM}/>
                                <Checkbox id="4" name="hozier" title="Hozier" checked={hozier} handleChange={handleChangeHozier}/>
                                <Checkbox id="5" name="harry" title="Harry Styles" checked={harry} handleChange={handleChangeHarry}/>
                                <Checkbox id="6" name="variousArtist" title="Various Artists" checked={variousArtist} handleChange={handleChangeVariousArtist}/>
                            </div>
                
                            <h4 class="filter-type">By Language</h4>
                            <div class="display-buttons">
                                <Checkbox id="7" name="english" title="English" checked={english} handleChange={handleChangeEnglish}/>
                                <Checkbox id="8" name="korean" title="Korean" checked={korean} handleChange={handleChangeKorean}/>
                                <Checkbox id="9" name="variousLang" title="Various Languages" checked={variousLang} handleChange={handleChangeVariousLang}/>
                            </div>
                        </div>

                        <div class="sort-container">
                            <h3 class="display-method">SORT</h3>
                            <div class="display-buttons">
                                <RadioButton id="AlphabeticalArtist" value="AlphabeticalArtist" sortType={sortType} checkSortType="AlphabeticalArtist" onOptionChange={onOptionChange} htmlFor="AlphabeticalArtist" buttonText="Alphabetically (Artist)"/>
                                <RadioButton id="AlphabeticalName" value="AlphabeticalName" sortType={sortType} checkSortType="AlphabeticalName" onOptionChange={onOptionChange} htmlFor="AlphabeticalName" buttonText="Alphabetically (Name)"/>
                                <RadioButton id="AscendingYear" value="AscendingYear" sortType={sortType} checkSortType="AscendingYear" onOptionChange={onOptionChange} htmlFor="AscendingYear" buttonText="Oldest to Newest"/>
                                <RadioButton id="DescendingYear" value="DescendingYear" sortType={sortType} checkSortType="DescendingYear" onOptionChange={onOptionChange} htmlFor="DescendingYear" buttonText="Newest to Oldest"/>
                            </div>
                        </div>

                        <button class="reset" onClick={() => {
                            resetFiltersAndSort();
                        }}>Reset</button>

                    </div>

                    <div class="aggregator-container">
                        <AggregatorComponent totalMinutes={totalMinutes} totalSongs={totalSongs} aggregator={aggregator}/>
                    </div>
                </div>
            
                <div class="list">
                    {list.map((item) => (
                        <AlbumComponent prop1={item} updateAggregator={addToAggregator}/>
                    ))}
                </div>
            </div>


            <br/>

            <p class="sources">Information and Image Sources: Spotify, Apple Music, BIGHIT MUSIC.</p>
            
        </div>
    );
}

export default App;

