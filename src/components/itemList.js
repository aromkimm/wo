import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const ItemList = ({ items }) => {
  const itemWidth = window.innerWidth / 2
  const itemHeight = window.innerHeight - 115 // header 높이 빼기
  const imgSize = (itemHeight >= itemWidth ? itemWidth : itemHeight) * 0.88

  return (
    <ul className="contents">
    {
      items.map((item, index) => {
        const itemNameSplit = item.name.split(/\s/g)
        return (
          <li className="item" key={item.id} style={{height: `${itemHeight}px`}}>
            <Link to={`/${itemNameSplit[0].toLowerCase()}/${itemNameSplit[1]}`}>
              <h2>{item.name}</h2>
              <h3>{item.id}</h3>
              <div className="img-box">
                {
                  item.images.map((image, index) => (
                    <Img key={`${item.id}-${index}`}
                      fluid={image.childImageSharp.fluid}
                      style={{width:`${imgSize}px`, height: `${imgSize}px`}}
                    />
                  ))
                }
              </div>
            </Link>
          </li>
        )
      })
    }
    </ul>
  )
}

export default ItemList