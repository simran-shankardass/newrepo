# Development


### Link to Deployed Website
https://simran-shankardass.github.io/newrepo/


### Goal and Value of the Application
My overall goal was to develop an interactive list-based interface using React components and an internal data state.

To this end, I created an application that displays various musical albums and their information (artist, release year, language, number of songs, length in minutes, and a description). I love music (who doesn’t?), but there are so many factors to consider when choosing what to listen to. Who’s singing? What language are they singing in (do I need to be able to sing along correctly, or will a language I know distract me from my UIUX homework)? What year will the album remind me of (pleasant throwback to 2016 summer, or angsty reminder of your 2020 Covid lockdown?) Will I be able to listen to the whole album in one car ride while looking out of the window like I’m in a music video? 

With restrictions such as these in mind when choosing what to listen to, I thought it would be nice to be able to easily filter and sort music options to discover what you want to listen to, rather than scrolling endlessly through Spotify or filtering in your own head. My application has different filters and sorting capabilities that can be applied in combination to facilitate easier music selection. It also has a ‘Favourites’ aggregator - you can Favorite and Unfavourite albums, and the aggregator tracks the total length of all your ‘Favourites’ albums and the total number of songs. I chose to aggregate these values because it helps in making playlists of a certain length (for example, the length of a plane ride, as I often like to make) without having to manually add minutes or go back and forth adding and removing things on music apps. 


### Usability Principles Considered
To increase efficiency, learnability, and memorability, my application has:

- A clear, well-defined layout: information is well-organized, so it’s clear to users what is what and easy to find information.
- Intentional use of whitespace to increase readability.
- Intuitive UI elements like checkboxes and radio buttons for filtering and sorting respectively: these are well-known, so users can quickly begin using them because of past experience.
- Consistency in UI elements, font, and general design.
- Clear hierarchy: contrasting sizes, styles, colours, and weights of text make the information hierarchy clear and consistent.
- Simple design and user-friendly colour scheme: the user isn’t distracted from content by loud colors or slowed down by lack of readability or difficult font.

In general, these considerations make the functions of the application easy to understand, and the application intuitive to use.


### Organization of Components
- Checkbox: this component creates a filter checkbox, and holds information needed for it (including a function for handling change on checking it, a variable that tracks whether or not it is checked, and the desired label). It is used in App.js, where the information it fills into the checkbox is passed to it through props.

- RadioButton: this component creates a sorting radio button, and holds information needed for it (including a function for handling change on selecting, a variable that tracks whether or not it is selected, and the desired label). It is used in App.js, where the information it fills into the radio button is passed to it through props.

- AggregatorComponent: this component creates the structure of the Favourites aggregator, including the list of ‘Favourited’ albums and the total values aggregated. It is used in App.js, where it is passed the aggregator and state variables for total songs and total minutes, which it uses to fill data in the structure.

- AlbumComponent: this component creates the structure of a list item, i.e., an album tile, including the album image, name, artist, release year, language, number of songs, length, description, and a Favourite button. It is used in App.js where it is passed props from albumData.json so it can extract the album information and fill it into the structure. It is also passed an updateAggregator function, that is called on clicking the Favourite button.

- Finally, App.js is the main application.


### How Data is Passed Down Through Components
- albumData.json holds a list of albums with all their associated data (name, artist, year, language, description, minutes, songs, image path, and whether or not the album has been ‘Favourited’).

- App.data imports this data.

- The list is filtered and sorted according to the options selected.

- The filtered and sorted list is mapped to AlbumComponents - for each component created, the JSON data is passed into AlbumComponent as props for it to use to display the correct album tile.


### How the User Triggers State Changes
- Filtering: Users can filter by Artist (6 options) and/or Language (3 options). Each possible filter has an associated state variable (true if checked, false if not checked). When a filter is checked, the handleChange function sets its state variable to the opposite of its current state. This triggers a change of the state variable for the list that is mapped to AlbumComponents.
    - Filtering under one category is OR filtering - for example, if ‘BTS’ and ‘Hozier’ are checked, all BTS and Hozier albums will show.
    - Filtering under both categories is AND filtering - for example, if an artist has albums in English and Korean, filtering by the artist and English will only show albums that are both by the artist AND in English. Therefore, a combination of, for example, ‘Taylor Swift’ and ‘Korean’ will yield no results.

- Sorting: Users can sort alphabetically by name, alphabetically by artist, and by year in both directions. Only one sort can be selected at a time. Selecting any sort calls updates the sorting state variable with the type of sort selected. This triggers a change of the state variable for the list that is mapped to AlbumComponents, to change the order.

- Reset: On clicking reset, all filter state variables are set to false and the sort state variable is set to the default original sort (alphabetical by artist). This triggers a change of the state variable for the list that is mapped to AlbumComponents back to the original display.

- Displayed list: A state variable for the list is updated after a sort/filter/reset is clicked, with the newly filtered/sorted/reset list. Sorting and filtering can be applied together - clicking one doesn’t affect the state variables of the other.

- Aggregator: The Favourites aggregator shows a list of aggregated items and two total values aggregated. The list and the totals have state variables that are updated by methods when any item’s ‘Favourite’ button is clicked (or un-clicked). The list and totals displayed are then updated accordingly.
