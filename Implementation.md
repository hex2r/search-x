# Search X

Implement the basics of a search engine client similar to Google Search Engine. It should contain a search input with a list of auto-completion with search history, a paginated list of search results, and metadata such as results count and time to request and render results.

**Design**: Material UI (custom), similar to Google Search Engine

#### Tech stack:

- [?] Docker
- Vite
- ReactJS & TypeScript
- Utility: Lodash, Intl
- Styled Components [?] Tailwind
- [?] Serve JSON as a fake DB

_(in case of enough time)_

- REST
- DB e.g Prisma
- NodeJS + Express server

#### Browser support

_Not provided_ (should be supported in latest versions)

##### ⚠️ Forbidden ⚠️

- Avoid use 3d party library for styling
- Avoid using ES6 classes
- Avoid using React State Management Libraries

#### Configurations

- DB_PORT - default DB port is 3306 which is provided in .env file

#### Behaviour

##### App

- Data Context (React Context API)
- Implement support themes
- [?] Ability to change theme

##### Search Input

- Keep the search input (ability to type and perform a new search)
- Display list of results with auto-completion and search history on typing (max 10 items)
- Display search history in the list of auto-completion
- Search history items should be removable
- Display search results items in they exist
- Close auto-completion list on pressing Esc
- Save auto-completion results on focus loose or closing the auto-completion list
- Submit on pressing Enter

##### Search Results List

- Should not contain any text if nothing to display
- Should display paginated list
- Title of each search result should be a link of the website which can be opened in a new window
- [?] Display error message in case of error

#### Metadata

- [ ] Display how many items were found and time to render

#### API

- GET /suggestions - endpoint for getting suggestions (not implemented)
- GET /data - endpoint for getting data which need to be rendered (not implemented)

#### Interfaces

##### Search Item

```ts
interface SearchItem {
  id: string
  url: string
  title: string
  description: string
}
```

#### Security / Validation

In real project validation should be implemented on BE as well.

- Prevent passing a long strings (set max length)
- Check for string type for query
- Sanitize value passed to input field

#### Accessibility

- [x] Search Input should have autofocus on page load
- [x] Ability to navigate using keyboard (tab only)
- [x] Each interactive element should have a visible focus state on keyboard navigation
- [ ] Ability to navigate inside Search Control using cursor control keys (↑, ↓, ←, →)
- [ ] Announce search results, errors or application states using aria-live attribute

#### Testing

_Not provided_

### Questions to

- Does search history should be stored in Local Storage or Session Storage?

#### Personal thoughts

- **Tailwind** - it is a great tool which can significantly decrease time required for writing CSS code. However, it has not been chosen because of technical requirements (show my skills on styling).
- **Real DB** it is optional and will take extra time for implementation so used fake one.
- **Search Results List** in real projects should be discussed. I decide to render the error message.
