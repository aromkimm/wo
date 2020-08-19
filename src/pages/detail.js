import React, { useContext, useState, useRef } from 'react'
import { Link, graphql } from 'gatsby'
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
  const [isPrevVisible, setPrevVisible] = useState(false)
  const [isNextVisible, setNextVisible] = useState(data.dataJson.items.length > 5)
  const container = useRef()
  const item = data.dataJson.items.find(item => item.name === pageContext.itemName)

  const controlMoreItems = type => {
    const c = container.current
    const block = c.firstElementChild.clientWidth + 1

    switch (type) {
      case 'prev': c.scrollTo(c.scrollLeft - block, 0); break
      case 'next': c.scrollTo(c.scrollLeft + block, 0); break
      default:
        setPrevVisible(c.scrollLeft > 0)
        setNextVisible((c.scrollLeft + c.clientWidth) < c.scrollWidth)
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
                      row.map(colorCode => (
                        <li style={{backgroundColor: colorCode}} key={colorCode}>
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
		    <ul ref={container} onScroll={controlMoreItems}>
          {
            data.dataJson.items.map(item => {
              if (item.name !== pageContext.itemName) {
                const itemNameSplit = item.name.split(/\s/g)
                return (
                  <li key={item.id}>
                    <Link to={`/${itemNameSplit[0].toLowerCase()}/${itemNameSplit[1]}`}>
                      <Img fluid={item.images[1].childImageSharp.fluid} />
                      <div className="box">
                        <div className="text">{item.id}</div>
                      </div>
                    </Link>
                  </li>
                )
              } else {
                return null
              }
            })
          }
        </ul>
        <div className="arrow">
		      <button
            className={`prev${isPrevVisible ? '': ' hide'}`}
            onClick={() => controlMoreItems('prev')}>
              이전
            </button>
		      <button
            className={`next${isNextVisible ? '': ' hide'}`}
            onClick={() => controlMoreItems('next')}>
              다음
            </button>
		    </div>
      </div>
    </section>
  </div>
  )
}

export default Detail