# Movies-Retrieval-App

## Key features : 

### - fetch API implementation. Based on the user's input, the fetch API returns movie information.

### - Pagination. If the returned movies are less than 6, the "More results" button is hidden. If the results are more than six, the button pops up and once clicked, the next six batch of results are shown. If there are no more results, the button gets hidden again

### - Button functionality. When a user clicks on the search button, results are displayed on the page. If there are more than six results returned, another button pops up. This button is used to display more results. If the results are exhausted, the text of  the button changes to "Clear results". And when it is clicked, the results and the title will be cleared.

## Some tips:

#### - The url to the API has some parameters, with the following two being tricky to comprehend:

#####	- t : Used to search for a movie by its title. The information returned is for a specific movie.

#####	- s - Used to search for multiple movies based on a search query. A list of movies is returned by the API.
