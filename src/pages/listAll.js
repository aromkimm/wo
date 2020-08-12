import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Header from '../components/header'
import ItemList from '../components/itemList'

const ListAll = ({ pageContext }) => (
  <StaticQuery
    query={graphql`
      query {
        allDataJson {
          nodes {
            index
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
      }
    `}
    render={data => {
      const items = data.allDataJson.nodes.sort((a, b) => a.index - b.index).map(node => node.items).flat()

      return (
        <div>
          <Header menuList={pageContext.menuList} background={true} />
          <section className="list">
            <ItemList items={items} />
          </section>
        </div>
      )
    }}
  />
)

export default ListAll