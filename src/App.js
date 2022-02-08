import React from "react"
import "./App.css"
import {
	InstantSearch,
	SearchBox,
	Pagination,
	Configure,
	connectHits,
} from "react-instantsearch-dom"
import AnvereInstantSearchAdapter from "./lib/AnvereInstantsearchAdapter"

function App() {
	const anvereInstantsearchAdapter = new AnvereInstantSearchAdapter({
		server: {
			nodes: [
				{
					applicationId: "4nemgxlg1644289854",
					host: `search-us.anvere.net/caVK9B9r1644289854`,
					protocol: "https",
					adminApiKey: "99a46dd6c40dc2c2c20ff403d9edd6dc",
				},
			],
		},

		// additionalSearchParameters: {
		// 	queryBy: "title,authors",
		// },
	})

	// const searchClient = anvereInstantsearchAdapter.searchClient

	const searchClient = {
		search(requests) {
			if (
				requests.every(({ params }) => !params.query)
			) {
				return Promise.resolve({
					results: requests.map(() => ({
						hits: [],
						nbHits: 0,
						nbPages: 0,
						page: 0,
						processingTimeMS: 0,
						total_docs: 0,
					})),
				})
			}

			return anvereInstantsearchAdapter.searchClient.search(requests)
		},
	}

	const Hits = ({ hits }) => {
		console.log("hits", hits)

		return (
			<ul className="searchAnvere__list">
				{hits.length > 0 ? (
					hits.map((item, index) => {
						return (
							<li className="searchAnvere__item" key={index}>
								<a
									href={`https://mentori.vn/user/${item.uss_use_id}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={`https://mentori.vn/upload/images/${item.uss_avatar}`}
										alt={`thumbnail-${index}`}
									/>
									<span
										className="span1"
										dangerouslySetInnerHTML={{
											__html: item["_highlightResult"]
												.uss_name.value
										}}
									/>
									<span
										className="span2"
										dangerouslySetInnerHTML={{
											__html: item["_highlightResult"]
												.uss_position.value
										}}
									/>
								</a>
							</li>
						)
					})
				) : (
					<li className="searchAnvere__empty">No results</li>
				)}
			</ul>
		)
	}

	const CustomHits = connectHits(Hits)

	return (
		<div className="App">
			<header className="header">
				<h1 className="header-title">
					<a href="/">Fast npm search by Anvere</a>
				</h1>
				<p className="header-subtitle">
					using&nbsp;
					<a href="https://github.com/algolia/instantsearch.js">
						Anvere + InstantSearch.js
					</a>
				</p>
			</header>
			<div className="container">
				<div className="searchAnvere">
					<InstantSearch
						indexName="43nci6im1644289911"
						searchClient={searchClient}
					>
						<SearchBox defaultRefinement="*" autoFocus />
						<CustomHits />
						<Configure hitsPerPage={10} />
						<Pagination />
					</InstantSearch>
				</div>
			</div>
		</div>
	)
}

export default App
