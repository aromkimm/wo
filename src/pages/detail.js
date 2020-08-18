import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { GlobalStateContext } from '../context/GlobalContextProvider'
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
  const state = useContext(GlobalStateContext)
  const item = data.dataJson.items.find(item => item.name === pageContext.itemName)

  const controlMoreItems = event => {
    let container = document.querySelector('.more ul')
    let prev = document.querySelector('.prev')
    let next = document.querySelector('.next') 
    let itemWidth = container.firstElementChild.clientWidth + 1

    switch (event.target.dataset.type) {
      case 'prev': container.scrollTo(container.scrollLeft - itemWidth, 0); break
      case 'next': container.scrollTo(container.scrollLeft + itemWidth, 0); break
      default:
        prev && container.scrollLeft > 0 
          ? prev.classList.remove('hide')
          : prev.classList.add('hide')
        next && (container.scrollLeft + container.clientWidth) < container.scrollWidth 
          ? next.classList.remove('hide') 
          : next.classList.add('hide')
    }
  }

  return (
  <div>
    <Header menuList={pageContext.menuList} background={true} />
    <section className="detail">
      <div className="item" style={{height: `${state.itemHeight}px`}}>
        <div className="img-box">
          <Img
            fluid={item.images[1].childImageSharp.fluid}
            style={{width:`${state.imgSize}px`, height: `${state.imgSize}px`}}
          />
        </div>
      </div>
      <div className="item" style={{height: `${state.itemHeight}px`}}>
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
                item.colors.map((row, index) => (
                  <ul key={index}>
                    {
                      row.map(line => (
                        <li style={{backgroundColor: line}} key={line}>
                          <div className="box" />
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
		    <ul onScroll={controlMoreItems}>
          {
            data.dataJson.items.map(item => {
              if (item.name !== pageContext.itemName) {
                return (
                  <li key={item.id}>
                    <Img fluid={item.images[1].childImageSharp.fluid} />
                    <div className="box">
                      <div className="text">{item.id}</div>
                    </div>
                  </li>
                )
              }
            })
          }
        </ul>
        <div className="arrow">
		      <div
            data-type="prev"
            className="prev hide"
            onClick={controlMoreItems} />
		      <div
            data-type="next"
            className={`next${data.dataJson.items.length > 5 ? '': ' hide'}`}
            onClick={controlMoreItems} />
		    </div>
      </div>
    </section>
  </div>
  )
}

export default Detail