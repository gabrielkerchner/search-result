import React from 'react'
import { path } from 'ramda'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['progressBarContainer', 'progressBar', 'progressBarFiller']

const ProductsProgressBar = ({
  recordsFiltered: recordsFilteredProp,
  products: productsProp,
}) => {
  const { searchQuery } = useSearchPage()
  let productsLoadedPercentage

  const handles = useCssHandles(CSS_HANDLES)
  const products =
    path(['data', 'productSearch', 'products'], searchQuery) || []
  const recordsFiltered = path(
    ['data', 'productSearch', 'recordsFiltered'],
    searchQuery
  )

  if (!recordsFiltered || !products.length) {
    productsLoadedPercentage = Math.round(
      (100 * productsProp.length) / recordsFilteredProp
    )
  } else {
    productsLoadedPercentage = Math.round(
      (100 * products.length) / recordsFiltered
    )
  }

  if (products.length === 0 && productsProp.length === 0) {
    return null
  }

  return (
    <div className={handles.progressBarContainer}>
      <div
        className={`${handles.progressBar} relative flex bg-action-secondary center mv4 br-pill w-50 w-30-m w-25-l h1`}
      >
        <span
          className={`${handles.progressBarFiller} absolute br-pill bg-action-primary h1`}
          style={{ width: `${productsLoadedPercentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProductsProgressBar
