import React from 'react'
import { graphql } from 'gatsby'

import Header from '../components/header'
import ItemList from '../components/itemList'

export const query = graphql`
  query($category: String) {
    dataJson(category: { eq: $category }) {
      description
      items {
        name
        id
        images {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const List = ({ data, pageContext }) => {
  const category = data.dataJson

  return (
    <div>
      <Header menuList={pageContext.menuList} background={true} />
      <section className="list">
        <marquee className="description">{category.description}</marquee>
        <ItemList items={category.items} />
      </section>
    </div>
  )
}

export default List
