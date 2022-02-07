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
					applicationId: "o233zk2q1639711862",
					host: `search.anvere.net/dAo8iPAW1639711870`,
					protocol: "https",
				},
			],
		},

		// additionalSearchParameters: {
		// 	queryBy: "title,authors",
		// },
	})

	const searchClient = anvereInstantsearchAdapter.searchClient

	const Hits = ({ hits }) => {
		console.log("hits", hits)

		return (
			<ul className="searchAnvere__list">
				{hits.length > 0 ? (
					hits.map((item, index) => {
						return (
							<li className="searchAnvere__item" key={index}>
								<a
									// href={`https://www.npmjs.com/package/${props.hit.id}`}
									target="_blank"
								>
									<img
										src={`https://www.milwaukeetool.my/media/catalog/product/cache/f69d6d03f607c5487aa6c0d8ff0727bd${item.base_image}`}
										alt={`thumbnail-${index}`}
									/>
									<span>{item.name}</span>
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
						indexName="p8d4fw561639816258"
						searchClient={searchClient}
					>
						<SearchBox />
						<CustomHits />
						<Configure hitsPerPage={8} />
						<Pagination />
					</InstantSearch>
				</div>
			</div>
		</div>
	)
}

export default App
