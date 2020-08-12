import React from 'react'
import { graphql } from "gatsby"
import Img from 'gatsby-image'

import Header from '../components/header'

export const query = graphql`
  query($itemName: String) {
    dataJson(items: {elemMatch: {name: {eq: $itemName}}}) {
      items {
        name
        id
        detail
        drops
        colors
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

const Detail = ({ data, pageContext }) => {
  const itemWidth = window.innerWidth / 2
  const itemHeight = window.innerHeight - 115 // header 높이 빼기
  const imgSize = (itemHeight >= itemWidth ? itemWidth : itemHeight) * 0.88
  const item = data.dataJson.items.find(item => item.name === pageContext.itemName)

  return (
  <div>
    <Header menuList={pageContext.menuList} background={true} />
    <section className="detail">
      <div className="item" style={{height: `${itemHeight}px`}}>
        <div className="img-box">
          <Img
            fluid={item.images[1].childImageSharp.fluid}
            style={{width:`${imgSize}px`, height: `${imgSize}px`}}
          />
        </div>
      </div>
      <div className="item" style={{height: `${itemHeight}px`}}>
        <div className="top">
          <h2>{item.name}</h2>
          <h3>{item.id}</h3>
        </div>
        <div className="bottom">
          <div>
            <h4>DETAILS</h4>
            <div className="text">
              <i>○ </i> {item.detail}
            </div>
          </div>
          <div>
            <h4>PRODUCT INFOMATION</h4>
            <div className="drops">
              ○ the number of drops: {item.drops}
            </div>
            <div className="colors">
              <span>○ colors: </span>
              {
                item.colors.map(row => (
                  <ul>
                    {
                      row.map(line => (
                        <li style={{backgroundColor: line}}>
                          <div class="box" />
                        </li>
                      ))
                    }
                  </ul>
                ))
              }
            </div>
          </div>
			  </div>
	    </div>
      <div className="more">
		    <ul>
          {
            data.dataJson.items.map(item => {
              if (item.name !== pageContext.itemName) {
                return (
                  <li key={item.id}>
                    <Img fluid={item.images[1].childImageSharp.fluid} />
                    <div className="box"><div className="text">{item.id}</div></div>
                  </li>
                )
              }
            })
          }
        </ul>
        <div className="arrow">
		      <div data-type="prev" className="prev hide"></div>
		      <div data-type="next" className={`next${data.dataJson.items.length > 5 ? '': ' hide'}`}></div>
		    </div>
      </div>
    </section>
  </div>
  )
}

export default Detail